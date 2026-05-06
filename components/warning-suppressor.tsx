'use client';

import { useEffect } from 'react';

export function WarningsSuppressor() {
  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = function(...args: any[]) {
      const message = args[0]?.toString?.() || '';
      
      // Suppress THREE.Clock deprecation warning
      if (message.includes('THREE.Clock')) {
        return;
      }
      
      // Suppress container position warning for scroll animations
      if (message.includes('container has a non-static position')) {
        return;
      }
      
      originalWarn.apply(console, args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
