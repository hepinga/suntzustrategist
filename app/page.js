'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentResponse, setCurrentResponse] = useState(null);
  const [history, setHistory] = useState([]);
  const bottomRef = useRef(null);

  // 从本地存储加载历史记录
  useEffect(() => {
    const savedHistory = localStorage.getItem("suntzuHistory");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history:", e);
      }
    }
  }, []);

  // 保存历史记录到本地存储
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("suntzuHistory", JSON.stringify(history.slice(-3)));
    }
  }, [history]);

  // 自动滚动到底部
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentResponse]);

  // 提交问题
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    if (isLoading) return;
    
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      const newResponse = {
        question: input,
        answer: data.answer,
        timestamp: new Date().toISOString()
      };
      
      setCurrentResponse(newResponse);
      setHistory(prev => [...prev.slice(-2), newResponse]);
      setInput("");
    } catch (err) {
      console.error("Error:", err);
      setError("抱歉，请求处理时出错。请稍后重试。");
    } finally {
      setIsLoading(false);
    }
  };

  // 复制回答
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert("已复制到剪贴板");
      })
      .catch(err => {
        console.error('无法复制: ', err);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 bg-gray-900 text-white">
      {/* Header */}
      <div className="w-full max-w-4xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-amber-500 to-red-600 bg-clip-text text-transparent">
          孙子智策 | SunTzu Strategist AI
        </h1>
        <p className="text-center mt-2 text-gray-400">
          以《孙子兵法》智慧解决现代商业挑战
        </p>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl flex-1 flex flex-col space-y-6 overflow-y-auto">
        {/* Welcome Message */}
        {!currentResponse && history.length === 0 && (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">🏯</div>
            <h2 className="text-xl font-semibold mb-2">欢迎使用孙子智策</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              输入你面临的商业问题，获得基于《孙子兵法》的战略洞见。
            </p>
          </div>
        )}

        {/* Previous History */}
        {history.length > 0 && !currentResponse && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-400">最近咨询</h3>
            {history.map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="font-medium mb-2">问: {item.question}</div>
                <div className="text-gray-300 whitespace-pre-wrap">
                  {item.answer}
                </div>
                <div className="mt-3 text-right">
                  <button
                    onClick={() => copyToClipboard(item.answer)}
                    className="text-sm text-gray-400 hover:text-amber-500"
                  >
                    复制回答
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Current Response */}
        {currentResponse && (
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg animate-fadeIn">
            <div className="mb-4">
              <span className="font-medium text-amber-500">问题:</span>
              <div className="mt-1">{currentResponse.question}</div>
            </div>
            
            <div>
              <span className="font-medium text-amber-500">孙子智策:</span>
              <div className="mt-2 text-gray-200 whitespace-pre-wrap">
                {currentResponse.answer}
              </div>
            </div>
            
            <div className="mt-4 text-right">
              <button
                onClick={() => copyToClipboard(currentResponse.answer)}
                className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition"
              >
                复制回答
              </button>
            </div>
          </div>
        )}
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-t-amber-500 border-gray-700 rounded-full animate-spin"></div>
              <p className="mt-4 text-amber-500">正在思考中...</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-md" role="alert">
            <p className="font-bold">发生错误</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div ref={bottomRef} /> {/* For auto-scrolling */}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="w-full max-w-4xl mt-8 sticky bottom-0 bg-gray-900 py-4">
        <div className="flex items-center border-2 border-gray-700 rounded-lg overflow-hidden focus-within:border-amber-500 transition">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="请输入您的商业问题 (例如：如何应对竞争对手的价格战?)"
            className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`px-6 py-3 font-semibold transition
              ${isLoading || !input.trim()
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600 text-gray-900"
              }`}
          >
            {isLoading ? "思考中..." : "获取智策"}
          </button>
        </div>
      </form>

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center mt-8 text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} 孙子智策 | SunTzu Strategist AI. 
          AI建议仅供参考，不构成专业决策依据。
        </p>
        <p className="mt-1">
          <Link href="/about" className="hover:text-amber-500">关于我们</Link> | 
          <Link href="/privacy" className="hover:text-amber-500 ml-2">隐私政策</Link>
        </p>
      </footer>
    </main>
  );
}
