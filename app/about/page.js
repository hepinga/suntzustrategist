import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-amber-500 to-red-600 bg-clip-text text-transparent">
          关于 孙子智策 | SunTzu Strategist AI
        </h1>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <p>
            孙子智策 (SunTzu Strategist AI) 是一款创新的AI驱动商业战略工具，旨在将《孙子兵法》这部拥有2500年历史的东方智慧经典，与现代人工智能技术相结合，为当今的企业家、高管和决策者提供独特的战略洞察和 actionable 的建议。
          </p>
          <p>
            我们深知，在瞬息万变的商业环境中，快速而明智的决策至关重要。传统的商业咨询往往成本高昂且耗时较长，而通用的AI工具又可能缺乏针对性和文化深度。孙子智策致力于填补这一空白，成为您随手可得的AI战略顾问。
          </p>
          <h2 className="text-xl font-semibold text-amber-500 pt-4">我们的使命</h2>
          <p>
            赋能每一位商业领袖，运用东方智慧与现代科技，运筹帷幄，决胜千里。
          </p>
          <h2 className="text-xl font-semibold text-amber-500 pt-4">核心价值</h2>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><span className="font-medium">智慧传承:</span> 深度解读《孙子兵法》核心思想，应用于现代商业场景。</li>
            <li><span className="font-medium">AI驱动:</span> 利用先进的语言模型，提供快速、精准的战略分析。</li>
            <li><span className="font-medium">实战导向:</span> 生成可执行的策略建议和风险提示，助力决策。</li>
            <li><span className="font-medium">文化融合:</span> 特别针对新加坡、香港等亚太市场的商业文化进行优化。</li>
          </ul>
          <p className="pt-4">
            感谢您使用孙子智策。我们致力于不断改进和优化产品，为您提供更有价值的商业智慧。
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-md transition">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
