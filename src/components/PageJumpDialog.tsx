import React, { useState, useEffect, useRef } from 'react';

interface PageJumpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onJump: (page: number) => void;
  maxPages: number;
}

export const PageJumpDialog: React.FC<PageJumpDialogProps> = ({
  isOpen,
  onClose,
  onJump,
  maxPages,
}) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setInput('');
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(input, 10);
    if (page >= 1 && page <= maxPages) {
      onJump(page - 1);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4">ページ番号を入力</h2>
        <input
          ref={inputRef}
          type="number"
          min="1"
          max={maxPages}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={`1-${maxPages}の数字を入力`}
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            移動
          </button>
        </div>
      </form>
    </div>
  );
};