import React from 'react';
import { Trash2 } from 'lucide-react';

interface ClearButtonProps {
  onClick: () => void;
}

export const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300 rounded-lg hover:bg-gray-50"
      aria-label="現在のメモをクリア"
      title="現在のメモをクリア"
    >
      <Trash2 size={20} />
    </button>
  );
};