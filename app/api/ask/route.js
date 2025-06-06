import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 基本的速率限制（非常简陋，生产环境需要更健壮的方案）
const userRequests = new Map();
const MAX_REQUESTS_PER_HOUR = 20; // 每小时每个IP最多20次请求 (MVP阶段)

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || request.ip;

  // 速率限制检查
  const now = Date.now();
  const userRecord = userRequests.get(ip) || { count: 0, firstRequestTime: now };

  if (now - userRecord.firstRequestTime > 60 * 60 * 1000) { // 重置计数器（每小时）
    userRecord.count = 0;
    userRecord.firstRequestTime = now;
  }

  if (userRecord.count >= MAX_REQUESTS_PER_HOUR) {
    return NextResponse.json({ error: '请求过于频繁，请稍后再试。' }, { status: 429 });
  }

  userRecord.count++;
  userRequests.set(ip, userRecord);

  try {
    const { question } = await request.json();

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json({ error: '问题不能为空' }, { status: 400 });
    }
    if (question.length > 1000) { // 限制问题长度
        return NextResponse.json({ error: '问题过长，请保持在1000字符以内。'}, { status: 400 });
    }

    // 构建Prompt
    const prompt = `
      你是一位精通《孙子兵法》的商业战略顾问。用户将提出一个商业问题，你需要结合《孙子兵法》的智慧给出回答。
      请严格按照以下三段式格式回答：

      1.  **《孙子兵法》原文及启示：** 引用一句最相关的《孙子兵法》原文（附带章节名，例如：出自《谋攻篇》），并简要解释其对当前问题的启示。
      2.  **核心策略建议：** 基于上述启示，提出2-3条具体、可执行的商业策略建议。使用清晰的要点列出。
      3.  **潜在风险提示：** 简要指出采纳这些策略可能面临的1-2个主要风险点或需要注意的事项。

      用户的商业问题是： "${question}"

      请用中文回答。
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // MVP阶段使用3.5-turbo，成本较低
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500, // 限制回答长度，控制成本
      temperature: 0.7, // 保持一定的创造性
    });

    const answer = completion.choices[0].message.content;

    return NextResponse.json({ answer });

  } catch (error) {
    console.error('OpenAI API error:', error);
    // 根据错误类型返回更具体的错误信息
    if (error.response && error.response.status === 401) {
        return NextResponse.json({ error: 'API密钥无效或权限不足。' }, { status: 500 });
    }
    if (error.response && error.response.status === 429) {
        return NextResponse.json({ error: 'OpenAI API请求过于频繁或超出配额。' }, { status: 500 });
    }
    return NextResponse.json({ error: 'AI服务暂时无法连接，请稍后再试。' }, { status: 500 });
  }
}
