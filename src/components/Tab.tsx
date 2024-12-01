import React from 'react';
import { Circle } from 'lucide-react';

interface TabProps {
  isActive: boolean;
  onClick: () => void;
  index: number;
  hasContent: boolean;
}

export const Tab: React.FC<TabProps> = ({ isActive, onClick, index, hasContent }) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-4 transition-colors ${
        isActive
          ? 'bg-white text-gray-800'
          : 'bg-gray-100 text-gray-500 hover:bg-gray-50'
      }`}
    >
      {hasContent && (
        <Circle
          className="absolute top-2 right-2"
          size={6}
          fill={isActive ? '#4B5563' : '#9CA3AF'}
        />
      )}
      {index + 1}
    </button>
  );
};