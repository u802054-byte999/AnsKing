import React from 'react';
import { Solution } from '../types';

interface SolutionDisplayProps {
  solutions: Solution[];
}

const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ solutions }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-b-2 border-blue-500 pb-2">AI 詳解</h2>
      {solutions.map((solution, index) => (
        <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md transition-shadow hover:shadow-lg">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <span className="text-blue-500 dark:text-blue-400 font-bold mr-2">題目 {index + 1}:</span>
              {solution.question}
            </h3>
          </div>
          <div className="mb-4">
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              <span className="text-green-600 dark:text-green-400 font-bold mr-2">答案:</span>
              {solution.answer}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <span className="text-teal-600 dark:text-teal-400 font-bold mr-2">詳解:</span>
            </h4>
            <div className="prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap text-slate-600 dark:text-slate-400 leading-relaxed">
              {solution.explanation}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SolutionDisplay;
