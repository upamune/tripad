import { useState, useEffect, useCallback } from 'react';
import { MemoState } from '../types/memo';

const STORAGE_KEY = 'memo-app-state';
const ACTIVE_TAB_KEY = 'memo-active-tab';
const MAX_PAGES = 3;

export const useMemoState = () => {
  const [state, setState] = useState<MemoState>(() => {
    try {
      // Get the last active tab
      const savedActiveTab = parseInt(localStorage.getItem(ACTIVE_TAB_KEY) || '0', 10);
      const activeTab = isNaN(savedActiveTab) || savedActiveTab >= MAX_PAGES ? 0 : savedActiveTab;
      
      // Get saved memos
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedMemos = saved ? JSON.parse(saved).memos : [];
      
      // Create memos array with fixed page count
      const memos = Array.from({ length: MAX_PAGES }, (_, index) => ({
        id: index,
        content: savedMemos[index]?.content || '',
      }));

      return { activeTab, memos };
    } catch (error) {
      console.warn('Failed to load memo state:', error);
      return {
        activeTab: 0,
        memos: Array.from({ length: MAX_PAGES }, (_, index) => ({
          id: index,
          content: '',
        })),
      };
    }
  });

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
      if (tabIndex >= 0 && tabIndex < MAX_PAGES) {
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
      activeTab: (prev.activeTab + 1) % MAX_PAGES,
    }));
  }, []);

  const previousMemo = useCallback(() => {
    setState(prev => ({
      ...prev,
      activeTab: (prev.activeTab - 1 + MAX_PAGES) % MAX_PAGES,
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