import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

interface AdSenseUnitProps {
  className?: string;
}

/**
 * Reusable Google AdSense ad unit ("ad 2", slot 6406217436).
 * Safely initializes once per mounted component instance and prevents
 * duplicate pushes across React Strict Mode or component re-renders.
 */
export const AdSenseUnit: React.FC<AdSenseUnitProps> = ({ className = '' }) => {
  const insRef = useRef<HTMLModElement | null>(null);
  const initializedRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const insElement = insRef.current;
    if (!insElement) return;

    // Prevent duplicate initialization in React Strict Mode or if already processed by AdSense
    if (
      initializedRef.current ||
      insElement.getAttribute('data-adsbygoogle-status') ||
      insElement.getAttribute('data-ad-status')
    ) {
      return;
    }

    try {
      initializedRef.current = true;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Safely ignore ad blocker or network script errors without disrupting the app
    }
  }, []);

  return (
    <aside
      aria-label="Advertisement"
      className={`w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-12 my-8 overflow-hidden min-h-[90px] flex items-center justify-center ${className}`.trim()}
    >
      <div className="w-full">
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-6848191601714172"
          data-ad-slot="6406217436"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
};
