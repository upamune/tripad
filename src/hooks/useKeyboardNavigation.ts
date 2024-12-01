import { useCallback, useEffect } from 'react';

interface NavigationConfig {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const useKeyboardNavigation = ({
  currentPage,
  totalPages,
  onPageChange,
}: NavigationConfig) => {
  const handleNavigation = useCallback(
    (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            if (currentPage > 0) {
              onPageChange(currentPage - 1);
            }
            break;
          case 'ArrowRight':
            e.preventDefault();
            if (currentPage < totalPages - 1) {
              onPageChange(currentPage + 1);
            }
            break;
          default:
            const numKey = parseInt(e.key);
            if (!isNaN(numKey) && numKey >= 1 && numKey <= totalPages) {
              e.preventDefault();
              onPageChange(numKey - 1);
            }
        }
      }
    },
    [currentPage, totalPages, onPageChange]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleNavigation);
    return () => window.removeEventListener('keydown', handleNavigation);
  }, [handleNavigation]);
};