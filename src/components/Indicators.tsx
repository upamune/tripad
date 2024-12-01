import React from 'react';
import { HelpCircle } from 'lucide-react';
import { ClearButton } from './ClearButton';
import { PaginationControls } from './Pagination/PaginationControls';

interface IndicatorsProps {
  memos: { content: string }[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onHelpClick: () => void;
  onClear: () => void;
}

export const Indicators: React.FC<IndicatorsProps> = ({
  memos,
  activeIndex,
  onSelect,
  onHelpClick,
  onClear,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-50/50 border-b border-gray-100">
      <div className="w-[28px]" />
      <PaginationControls
        currentPage={activeIndex}
        totalPages={3}
        memos={memos}
        onPageChange={onSelect}
      />
      <div className="flex items-center gap-2">
        <ClearButton onClick={onClear} />
        <button
          onClick={onHelpClick}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300 rounded-lg hover:bg-gray-50"
          aria-label="ヘルプを表示"
          title="ヘルプを表示 (? キー)"
        >
          <HelpCircle size={20} />
        </button>
      </div>
    </div>
  );
}