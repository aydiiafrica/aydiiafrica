import { useState, useEffect } from 'react';

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
      setIsScrolling(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 0); // Debounce time for scroll end detection
    };

    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      clearTimeout(timeoutId);
    };
  }, []);

  return {
    scrollPosition,
    isScrolling,
    isScrolled: scrollPosition > 1000,
  };
}
