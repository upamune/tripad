import { useState, useEffect } from 'react';

const STORAGE_KEY = 'sliderPageCount';
const DEFAULT_PAGE_COUNT = 3;
const MIN_PAGES = 1;
const MAX_PAGES = 9;

export const usePageCount = () => {
  const [pageCount, setPageCount] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const count = parseInt(saved, 10);
        if (count >= MIN_PAGES && count <= MAX_PAGES) {
          return count;
        }
      }
    } catch (error) {
      console.warn('Failed to load page count from localStorage:', error);
    }
    return DEFAULT_PAGE_COUNT;
  });

  const updatePageCount = (newCount: number) => {
    if (newCount >= MIN_PAGES && newCount <= MAX_PAGES) {
      setPageCount(newCount);
      try {
        localStorage.setItem(STORAGE_KEY, newCount.toString());
      } catch (error) {
        console.warn('Failed to save page count to localStorage:', error);
      }
    }
  };

  return {
    pageCount,
    updatePageCount,
    MIN_PAGES,
    MAX_PAGES,
  };
};