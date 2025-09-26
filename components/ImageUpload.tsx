
import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploadProps {
  onImageChange: (file: File) => void;
  imageUrl: string | null;
  onSubmit: () => void;
  isLoading: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, imageUrl, onSubmit, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageChange(event.target.files[0]);
    }
  };

  return (
    <div className="w-full p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
      <div
        className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
        onClick={handleFileSelect}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {imageUrl ? (
          <img src={imageUrl} alt="Preview" className="mx-auto max-h-64 rounded-lg object-contain" />
        ) : (
          <div className="flex flex-col items-center text-slate-500 dark:text-slate-400">
            <UploadIcon className="w-12 h-12 mb-3" />
            <p className="font-semibold">點擊此處或拖曳圖片至此</p>
            <p className="text-sm">支援 JPG, PNG, WEBP 格式</p>
          </div>
        )}
      </div>
      {imageUrl && (
        <div className="mt-6 flex flex-col items-center">
            <button
                onClick={onSubmit}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    解題中...
                </>
                ) : (
                '開始解題'
                )}
            </button>
             <button
                onClick={handleFileSelect}
                className="mt-3 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            >
                重新選擇圖片
            </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
