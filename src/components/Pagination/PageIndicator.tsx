import React from 'react';

interface PageIndicatorProps {
  isActive: boolean;
  hasContent: boolean;
  onClick: () => void;
  pageNumber: number;
}

export const PageIndicator: React.FC<PageIndicatorProps> = ({
  isActive,
  hasContent,
  onClick,
  pageNumber,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-[8px] h-[8px] rounded-full transition-all duration-300 ${
        isActive ? 'bg-[#007AFF]' : 'bg-[#D1D1D6]'
      }`}
      title={`メモ ${pageNumber}${hasContent ? ' (内容あり)' : ''}`}
      aria-label={`メモ ${pageNumber}${hasContent ? ' (内容あり)' : ''}`}
      aria-current={isActive ? 'page' : undefined}
    />
  );
};