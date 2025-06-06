import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-amber-500 to-red-600 bg-clip-text text-transparent">
          隐私政策
        </h1>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 text-gray-300">
          <p>生效日期: {new Date().toLocaleDateString('zh-CN')}</p>

          <p>
            欢迎使用孙子智策 | SunTzu Strategist AI（以下简称"本服务"）。我们非常重视您的隐私。本隐私政策旨在说明我们如何收集、使用、共享和保护您的信息。
          </p>

          <h2 className="text-xl font-semibold text-amber-500 pt-4">1. 我们收集的信息</h2>
          <p>
            当您使用本服务时，我们可能会收集以下类型的信息：
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li><strong>您提供的问题文本：</strong>您在输入框中提交的商业问题。</li>
            <li><strong>使用数据：</strong>例如您的IP地址（仅用于速率限制和基本分析，不会与您的个人身份关联）、浏览器类型、访问时间、页面浏览量。我们使用Vercel Analytics进行基本分析，该服务注重隐私保护。</li>
            <li><strong>本地存储数据：</strong>我们可能会在您的浏览器本地存储中保存您最近的几次查询历史，以便您再次访问时查看。此数据仅存储在您的设备上，不会上传到我们的服务器。</li>
          </ul>

          <h2 className="text-xl font-semibold text-amber-500 pt-4">2. 我们如何使用您的信息</h2>
          <p>
            我们使用收集到的信息主要用于以下目的：
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>向您提供和维护本服务，包括处理您的问题并生成AI回复。</li>
            <li>改进和优化本服务，例如分析使用模式以提升用户体验和AI模型性能。</li>
            <li>防止滥用和确保本服务的安全。</li>
          </ul>
          <p>
            我们不会将您输入的问题文本用于训练通用AI模型，除非您明确同意。您的问题将通过API发送给OpenAI进行处理，OpenAI有其自身的隐私和数据使用政策。
          </p>

          <h2 className="text-xl font-semibold text-amber-500 pt-4">3. 信息共享与披露</h2>
          <p>
            我们不会将您的个人可识别信息出售、交易或以其他方式转让给外部方，除非：
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>为了向您提供服务，例如将您的问题发送给OpenAI API以获取回复。</li>
            <li>法律要求或为了响应有效的法律程序。</li>
            <li>为了保护我们的权利、财产或安全，或用户及公众的权利、财产或安全。</li>
          </ul>

          <h2 className="text-xl font-semibold text-amber-500 pt-4">4. 数据安全</h2>
          <p>
            我们采取合理的安全措施来保护您的信息免遭未经授权的访问、使用或泄露。但是，请注意，没有任何通过互联网传输或电子存储的方法是100%安全的。
          </p>
          
          <h2 className="text-xl font-semibold text-amber-500 pt-4">5. Cookie 和本地存储</h2>
          <p>
            我们使用浏览器的本地存储功能来保存您最近的查询历史，以改善您的用户体验。您可以随时清除浏览器缓存和本地存储数据。我们目前不直接使用Cookie进行追踪。
          </p>

          <h2 className="text-xl font-semibold text-amber-500 pt-4">6. 本隐私政策的变更</h2>
          <p>
            我们可能会不时更新本隐私政策。任何变更都将在此页面上发布新的隐私政策。建议您定期查看本隐私政策以了解任何变更。
          </p>

          <h2 className="text-xl font-semibold text-amber-500 pt-4">7. 联系我们</h2>
          <p>
            如果您对本隐私政策有任何疑问，请通过 [您的联系邮箱] 与我们联系。
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
