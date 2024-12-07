import React from 'react';
import { X } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { keys: ['⌥', '1-3'], description: 'メモ1-3に直接移動' },
    { keys: ['⌥', '←'], description: '前のメモに移動' },
    { keys: ['⌥', '→'], description: '次のメモに移動' },
    { keys: ['⌥', 'Shift', 'C'], description: '現在のメモをコピー' },
    { keys: ['?'], description: 'このヘルプを表示' },
    { keys: ['ESC'], description: 'ヘルプを閉じる' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 m-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">キーボードショートカット</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="閉じる"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd
                    key={keyIndex}
                    className="px-2 py-1 bg-gray-100 rounded-lg text-sm font-mono"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
              <span className="text-gray-600">{shortcut.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};