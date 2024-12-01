import { useState, useEffect, useCallback } from 'react';
import { MemoState } from '../types/memo';

const STORAGE_KEY = 'memo-app-state';
const ACTIVE_TAB_KEY = 'memo-active-tab';
const PAGE_COUNT_KEY = 'sliderPageCount';

export const useMemoState = () => {
  const [state, setState] = useState<MemoState>(() => {
    try {
      // Get the current page count
      const pageCount = parseInt(localStorage.getItem(PAGE_COUNT_KEY) || '3', 10);
      
      // Get the last active tab
      const savedActiveTab = parseInt(localStorage.getItem(ACTIVE_TAB_KEY) || '0', 10);
      const activeTab = isNaN(savedActiveTab) || savedActiveTab >= pageCount ? 0 : savedActiveTab;
      
      // Get saved memos
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedMemos = saved ? JSON.parse(saved).memos : [];
      
      // Create memos array with the current page count
      const memos = Array.from({ length: pageCount }, (_, index) => ({
        id: index,
        content: savedMemos[index]?.content || '',
      }));

      return { activeTab, memos };
    } catch (error) {
      console.warn('Failed to load memo state:', error);
      return {
        activeTab: 0,
        memos: Array.from({ length: 3 }, (_, index) => ({
          id: index,
          content: '',
        })),
      };
    }
  });

  // Listen for page count changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === PAGE_COUNT_KEY) {
        const newPageCount = parseInt(e.newValue || '3', 10);
        
        setState(prev => {
          // Preserve existing memos and add new empty ones if needed
          const newMemos = Array.from({ length: newPageCount }, (_, index) => ({
            id: index,
            content: prev.memos[index]?.content || '',
          }));

          // Adjust active tab if it's now out of bounds
          const newActiveTab = prev.activeTab >= newPageCount ? 0 : prev.activeTab;

          return {
            activeTab: newActiveTab,
            memos: newMemos,
          };
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      localStorage.setItem(ACTIVE_TAB_KEY, state.activeTab.toString());
    } catch (error) {
      console.warn('Failed to save memo state:', error);
    }
  }, [state]);

  const setActiveTab = useCallback((tabIndex: number) => {
    setState(prev => {
      if (tabIndex >= 0 && tabIndex < prev.memos.length) {
        return { ...prev, activeTab: tabIndex };
      }
      return prev;
    });
  }, []);

  const updateMemoContent = useCallback((content: string) => {
    setState(prev => ({
      ...prev,
      memos: prev.memos.map((memo, index) =>
        index === prev.activeTab ? { ...memo, content } : memo
      ),
    }));
  }, []);

  const clearCurrentMemo = useCallback(() => {
    setState(prev => ({
      ...prev,
      memos: prev.memos.map((memo, index) =>
        index === prev.activeTab ? { ...memo, content: '' } : memo
      ),
    }));
  }, []);

  const copyCurrentMemo = useCallback(() => {
    const content = state.memos[state.activeTab].content;
    if (content) {
      navigator.clipboard.writeText(content);
    }
  }, [state.memos, state.activeTab]);

  const nextMemo = useCallback(() => {
    setState(prev => ({
      ...prev,
      activeTab: (prev.activeTab + 1) % prev.memos.length,
    }));
  }, []);

  const previousMemo = useCallback(() => {
    setState(prev => ({
      ...prev,
      activeTab: (prev.activeTab - 1 + prev.memos.length) % prev.memos.length,
    }));
  }, []);

  return {
    activeTab: state.activeTab,
    memos: state.memos,
    setActiveTab,
    updateMemoContent,
    clearCurrentMemo,
    copyCurrentMemo,
    nextMemo,
    previousMemo,
  };
};