import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-6 text-gray-900 font-serif">
      <div className="max-w-md w-full border-2 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-between items-end mb-2">
           <span className="text-xs font-bold tracking-widest border border-black px-1">MANUAL</span>
           <span className="text-xs font-mono">ISO-9001</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight">个人使用说明书</h1>
        <div className="h-0.5 bg-black w-full mb-8"></div>
        
        <div className="space-y-6 mb-12">
          <p className="text-lg leading-relaxed font-medium">
            本程序将通过 <span className="font-mono">18</span> 项核心参数测试，解析您的出厂设置与运行逻辑。
          </p>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 pl-2">
             <li>识别核心驱动型号</li>
             <li>生成维护保养指南</li>
             <li>界定系统警告阈值</li>
          </ul>
        </div>

        <button 
          onClick={() => navigate('/quiz')}
          className="w-full group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-black font-sans focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black hover:bg-gray-800"
        >
          START GENERATION
          <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </button>
        
        <div className="mt-8 flex justify-between text-[10px] text-gray-400 font-mono border-t border-gray-200 pt-2">
          <span>PRODUCED BY 海鸥实验室</span>
          <span>© 2026 HUMAN OS</span>
        </div>
      </div>
    </div>
  );
}
