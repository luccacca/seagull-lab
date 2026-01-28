import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions, type Option } from '../data/questions';

export default function Quiz() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (option: Option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Finished
      navigate('/result', { state: { answers: newAnswers } });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-6 text-gray-900 font-serif">
       <div className="max-w-md w-full border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col min-h-[500px]">
          {/* Header / Progress */}
          <div className="border-b-2 border-black p-4 flex justify-between items-center bg-gray-50">
             <span className="font-mono text-sm">Q.{currentQuestion.id.toString().padStart(2, '0')}</span>
             <div className="flex-1 mx-4 h-2 bg-white border border-black">
                <div className="h-full bg-black transition-all duration-300" style={{ width: `${progress}%` }}></div>
             </div>
             <span className="font-mono text-sm">{currentQuestionIndex + 1}/{questions.length}</span>
          </div>

          {/* Question */}
          <div className="p-8 flex-1 flex flex-col justify-center">
             <h2 className="text-2xl font-bold mb-8 leading-snug">{currentQuestion.text}</h2>
             
             <div className="space-y-4">
               {currentQuestion.options.map((option) => (
                 <button
                   key={option.id}
                   onClick={() => handleAnswer(option)}
                   className="w-full text-left p-4 border-2 border-gray-200 hover:border-black hover:bg-gray-50 transition-all duration-200 font-sans text-base group"
                 >
                   <span className="inline-block w-6 font-bold group-hover:underline">{option.id}.</span>
                   {option.text}
                 </button>
               ))}
             </div>
          </div>
          
          <div className="p-4 border-t-2 border-black bg-gray-50 flex justify-between items-center text-xs font-mono text-gray-500">
            <span>INPUT REQUIRED</span>
            <span>SEAGULL-LAB</span>
          </div>
       </div>
    </div>
  );
}
