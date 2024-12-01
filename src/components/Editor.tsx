import React from 'react';
import { LineNumbers } from './LineNumbers';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  return (
    <div className="w-full h-full flex">
      <LineNumbers content={content} />
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full py-8 pr-8 resize-none focus:outline-none font-mono text-lg leading-[1.8rem]"
        placeholder="メモを入力してください... (? キーでヘルプを表示)"
        autoFocus
      />
    </div>
  );
};