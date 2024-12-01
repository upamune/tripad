import React from 'react';
import { PageIndicator } from './PageIndicator';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  memos: Array<{ content: string }>;
  onPageChange: (page: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  memos,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-[12px] items-center">
      {Array.from({ length: totalPages }, (_, index) => (
        <PageIndicator
          key={index}
          isActive={index === currentPage}
          hasContent={Boolean(memos[index]?.content)}
          onClick={() => onPageChange(index)}
          pageNumber={index + 1}
        />
      ))}
    </div>
  );
};