import React, { useState } from 'react';
import { Editor } from './components/Editor';
import { Indicators } from './components/Indicators';
import { HelpModal } from './components/HelpModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useMemoState } from './hooks/useMemo';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const {
    activeTab,
    memos,
    setActiveTab,
    updateMemoContent,
    clearCurrentMemo,
    copyCurrentMemo,
    nextMemo,
    previousMemo,
  } = useMemoState();

  useKeyboardShortcuts({
    onNext: nextMemo,
    onPrevious: previousMemo,
    onClear: clearCurrentMemo,
    onCopy: copyCurrentMemo,
    onHelp: () => setIsHelpOpen(true),
    onEscape: () => setIsHelpOpen(false),
    goToMemo: setActiveTab,
    memos,
    activeTab,
  });

  // Ensure we have valid memos before rendering
  if (!memos || !Array.isArray(memos) || memos.length === 0) {
    return null;
  }

  // Ensure activeTab is within bounds
  const currentTab = Math.min(Math.max(0, activeTab), memos.length - 1);
  const currentMemo = memos[currentTab];

  if (!currentMemo) {
    return null;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm overflow-hidden flex flex-col transition-all duration-300">
          <Indicators
            memos={memos}
            activeIndex={currentTab}
            onSelect={setActiveTab}
            onHelpClick={() => setIsHelpOpen(true)}
            onClear={clearCurrentMemo}
          />
          <div className="h-[80vh] overflow-hidden">
            <Editor
              content={currentMemo.content}
              onChange={updateMemoContent}
            />
          </div>
        </div>
        <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      </div>
    </ErrorBoundary>
  );
}

export default App;