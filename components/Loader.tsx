
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm">
      <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="mt-4 text-lg font-medium text-slate-600 dark:text-slate-300">AI 智慧分析中，請稍候...</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">正在為您準備最詳盡的解答</p>
    </div>
  );
};

export default Loader;
