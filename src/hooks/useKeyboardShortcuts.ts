import { useEffect, useCallback } from 'react';
import { Memo } from '../types/memo';

interface ShortcutHandlers {
  onNext: () => void;
  onPrevious: () => void;
  onClear: () => void;
  onCopy: () => void;
  onHelp: () => void;
  onEscape: () => void;
  goToMemo: (index: number) => void;
  memos: Memo[];
  activeTab: number;
}

export const useKeyboardShortcuts = ({
  onNext,
  onPrevious,
  onClear,
  onCopy,
  onHelp,
  onEscape,
  goToMemo,
  memos,
  activeTab,
}: ShortcutHandlers) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Global shortcuts
      if (e.key === 'Escape') {
        onEscape();
        return;
      }

      if (e.key === '?' && !(e.target instanceof HTMLTextAreaElement)) {
        onHelp();
        return;
      }

      // Meta/Ctrl key shortcuts
      if (e.metaKey || e.ctrlKey) {
        const numKey = parseInt(e.key);
        if (!isNaN(numKey) && numKey >= 1 && numKey <= memos.length) {
          e.preventDefault();
          goToMemo(numKey - 1);
          return;
        }

        switch (e.key) {
          case 'ArrowRight':
            e.preventDefault();
            onNext();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            onPrevious();
            break;
          case 'c':
            if (e.shiftKey) {
              e.preventDefault();
              onCopy();
            }
            break;
        }
      }
    },
    [
      onEscape,
      onHelp,
      memos.length,
      goToMemo,
      activeTab,
      onNext,
      onPrevious,
      onCopy,
    ]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};