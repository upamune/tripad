import React from 'react';

interface LineNumbersProps {
  content: string;
}

export const LineNumbers: React.FC<LineNumbersProps> = ({ content }) => {
  const lineCount = content.split('\n').length;
  
  return (
    <div className="select-none text-[#8E8E93] text-xs font-mono pt-8 pl-6 pr-4 text-right min-w-[3rem] border-r border-gray-100">
      {Array.from({ length: Math.max(1, lineCount) }, (_, i) => (
        <div key={i + 1} className="leading-[1.8rem]">
          {i + 1}
        </div>
      ))}
    </div>
  );
};