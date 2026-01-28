import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { calculateResult, type ResultData } from '../utils/resultLogic';
import type { Option } from '../data/questions';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<ResultData | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!location.state?.answers) {
      navigate('/');
      return;
    }
    const answers = location.state.answers as Option[];
    setResult(calculateResult(answers));
  }, [location, navigate]);

  const handleDownload = async () => {
    if (!resultRef.current) return;
    
    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2, // Higher resolution
        backgroundColor: '#f5f5f5',
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `User_Manual_${result?.modelName || 'Result'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('下载失败，请重试');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '个人使用说明书',
          text: `我的型号是：${result?.modelName}。快来生成你的个人使用说明书！`,
          url: window.location.origin,
        });
      } catch (error) {
        console.log('Share cancelled', error);
      }
    } else {
      // Fallback for desktop/unsupported browsers
      try {
        await navigator.clipboard.writeText(`${window.location.origin} - 快来生成你的个人使用说明书！`);
        alert('链接已复制到剪贴板');
      } catch (err) {
        console.error('Copy failed', err);
      }
    }
  };

  if (!result) return null;

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-6 text-gray-900 font-serif">
      <div ref={resultRef} className="max-w-md w-full border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Header */}
        <div className="border-b-2 border-black p-6 text-center bg-gray-50 relative overflow-hidden">
           <div className="absolute top-2 left-2 text-[10px] font-mono text-gray-400 border border-gray-300 px-1 rounded">SEAGULL-LAB</div>
           <h1 className="text-3xl font-bold tracking-tight mb-1">个人使用说明书</h1>
           <p className="text-xs font-mono text-gray-500 uppercase">Personal User Manual • Official Document</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          
          {/* Model Info */}
          <section>
             <div className="flex items-center mb-2">
                <span className="bg-black text-white px-2 py-0.5 text-xs font-bold mr-2">MODEL</span>
                <h2 className="text-xl font-bold">{result.modelName}</h2>
             </div>
             <p className="text-sm leading-relaxed border-l-2 border-gray-200 pl-3">
               {result.description}
             </p>
          </section>

          {/* Specs */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-gray-200 pb-1">Technical Specifications</h3>
            <div className="space-y-3 font-mono text-xs">
              {result.specs.map((spec) => (
                <div key={spec.label} className="flex items-center">
                  <span className="w-24 shrink-0">{spec.label}</span>
                  <div className="flex-1 h-2 bg-gray-100 border border-gray-300">
                    <div className="h-full bg-black" style={{ width: spec.value }}></div>
                  </div>
                  <span className="ml-2 w-8 text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Usage */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-gray-200 pb-1">Operation Guide</h3>
            
            <div className="mb-4">
              <h4 className="font-bold text-sm mb-2 flex items-center">
                <span className="inline-block w-2 h-2 bg-black mr-2"></span>
                正确使用方式
              </h4>
              <ul className="text-sm list-decimal list-inside space-y-1 text-gray-700 pl-1">
                {result.correctUsage.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-2 flex items-center text-gray-500">
                <span className="inline-block w-2 h-2 bg-gray-300 mr-2"></span>
                错误使用方式
              </h4>
              <ul className="text-sm list-disc list-inside space-y-1 text-gray-500 pl-1">
                 {result.incorrectUsage.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </section>

          {/* Warnings */}
          <section className="bg-gray-50 border border-black p-4">
            <h3 className="font-bold text-sm mb-2 flex items-center text-red-600 uppercase">
               ⚠️ Warning
            </h3>
            <ul className="text-sm space-y-1 font-medium">
               {result.warnings.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          {/* Footer Notes */}
          <section className="border-t border-dashed border-gray-300 pt-6 mt-6">
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-gray-400">使用须知（重要）</h3>
              <ul className="text-xs text-gray-500 space-y-1.5 list-disc list-inside">
                <li>本说明书 不用于纠正人格</li>
                <li>不建议频繁测试或对照他人型号</li>
                <li>若使用体验良好，请保持原设置</li>
                <li>若无法适配，请更换使用者，而非设备</li>
              </ul>
            </div>
            
            <div className="bg-gray-100 p-3 text-xs text-gray-500 italic">
              <span className="font-bold not-italic mr-1">备注:</span>
              如果你不知道如何与本设备相处，请把这份说明书交给你身边的人。
            </div>
          </section>

          {/* Branding Footer inside capture area */}
          <div className="mt-8 flex justify-between text-[10px] text-gray-400 font-mono border-t border-gray-200 pt-2">
             <span>PRODUCED BY 海鸥实验室</span>
             <span>© 2026 HUMAN OS</span>
          </div>

        </div>
      </div>

      {/* Action Buttons (Outside capture area) */}
      <div className="max-w-md w-full mt-4 flex gap-2">
         <button 
           onClick={handleDownload}
           className="flex-1 py-2 bg-white border border-black text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 group"
           title="保存说明书"
         >
           <span className="group-hover:scale-110 transition-transform">⬇</span> 
           <span>SAVE</span>
         </button>
         
         <button 
           onClick={handleShare}
           className="flex-1 py-2 bg-white border border-black text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 group"
           title="分享给身边人"
         >
           <span className="group-hover:scale-110 transition-transform">↗</span>
           <span>SHARE</span>
         </button>

         <button 
           onClick={() => navigate('/')}
           className="flex-1 py-2 bg-black text-white border border-black text-xs font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-1 group"
           title="重新测试"
         >
           <span className="group-hover:rotate-180 transition-transform">↻</span>
           <span>REBOOT</span>
         </button>
      </div>

    </div>
  );
}
