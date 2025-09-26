import React, { useState, useCallback } from 'react';
import { Solution } from './types';
import { solveQuestionFromImage } from './services/geminiService';
import ImageUpload from './components/ImageUpload';
import SolutionDisplay from './components/SolutionDisplay';
import Loader from './components/Loader';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [solutions, setSolutions] = useState<Solution[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (file: File) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setSolutions(null);
    setError(null);
  };

  const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        }
      };
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  const handleSubmit = useCallback(async () => {
    if (!imageFile) {
      setError('請先選擇一張圖片。');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSolutions(null);

    try {
      const imagePart = await fileToGenerativePart(imageFile);
      // FIX: The JSON parsing logic is moved to the service. The service now returns a parsed object.
      const result = await solveQuestionFromImage(imagePart.inlineData.data, imagePart.inlineData.mimeType);
      setSolutions(result);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('解題時發生未知錯誤，請稍後再試。');
      }
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center gap-3">
            <SparklesIcon className="w-10 h-10" />
            AI 國中解題高手
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            拍照上傳，即刻獲得國中全科目詳解！
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <div className="lg:sticky top-8 self-start">
            <ImageUpload
              onImageChange={handleImageChange}
              imageUrl={imageUrl}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
          
          <div className="mt-8 lg:mt-0">
            {isLoading && <Loader />}
            {error && <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">{error}</div>}
            {solutions && <SolutionDisplay solutions={solutions} />}
            {!isLoading && !solutions && !error && (
              <div className="text-center text-slate-500 dark:text-slate-400 p-8 bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm">
                <h3 className="text-xl font-medium mb-2">準備開始解題</h3>
                <p>請在左側上傳你的題目照片，AI 將在此為您呈現詳盡的解答。</p>
              </div>
            )}
          </div>
        </div>

        <footer className="text-center mt-12 text-sm text-slate-500 dark:text-slate-600">
          <p>&copy; {new Date().getFullYear()} AI 國中解題高手. All Rights Reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
