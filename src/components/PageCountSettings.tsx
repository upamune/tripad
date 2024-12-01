import React, { useState } from 'react';
import { Settings } from 'lucide-react';

interface PageCountSettingsProps {
  currentCount: number;
  minPages: number;
  maxPages: number;
  onUpdate: (count: number) => void;
}

export const PageCountSettings: React.FC<PageCountSettingsProps> = ({
  currentCount,
  minPages,
  maxPages,
  onUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(currentCount.toString());
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCount = parseInt(inputValue, 10);

    if (isNaN(newCount)) {
      setError('数値を入力してください');
      return;
    }

    if (newCount < minPages || newCount > maxPages) {
      setError(`${minPages}から${maxPages}の間の数値を入力してください`);
      return;
    }

    onUpdate(newCount);
    setError(null);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300 rounded-lg hover:bg-gray-50"
        aria-label="ページ数設定"
        title="ページ数設定"
      >
        <Settings size={20} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 m-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">ページ数設定</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pageCount" className="block text-sm font-medium text-gray-700 mb-1">
              ページ数 ({minPages}-{maxPages})
            </label>
            <input
              type="number"
              id="pageCount"
              min={minPages}
              max={maxPages}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};