import React from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textSize?: string;
  showBadge?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 36,
  className = '',
  showText = true,
  textSize = 'text-[20px]',
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Official ColorCut Icon */}
      <div
        style={{ width: size, height: size }}
        className="rounded-xl overflow-hidden shrink-0 shadow-xs flex items-center justify-center bg-white border border-[#E5E7EB]"
      >
        <svg
          viewBox="0 0 128 128"
          width="100%"
          height="100%"
          className="p-1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoBlueCyan" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="40%" stopColor="#2563EB" />
              <stop offset="80%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="logoMagentaOrange" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="30%" stopColor="#DB2777" />
              <stop offset="70%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Back C: Blue-Cyan */}
          <path
            d="M 64 22 C 40.8 22 22 40.8 22 64 C 22 87.2 40.8 106 64 106 C 72 106 79.5 103.7 85.8 99.8 L 76.5 83.5 C 72.8 85.7 68.6 87 64 87 C 51.3 87 41 76.7 41 64 C 41 51.3 51.3 41 64 41 C 72.2 41 79.4 45.3 83.4 51.8 L 98.2 40.5 C 90.7 29.2 78.2 22 64 22 Z"
            fill="url(#logoBlueCyan)"
          />

          {/* Front C: Magenta-Orange with ribbon curve */}
          <path
            d="M 76 44 C 55.5 44 39 60.5 39 81 C 39 101.5 55.5 118 76 118 C 96.5 118 113 101.5 113 81 L 94 81 C 94 91 85.9 99 76 99 C 66.1 99 58 90.9 58 81 C 58 71.1 66.1 63 76 63 C 83.5 63 89.8 67.6 92.5 74 L 111.5 74 C 107.5 56.6 93.3 44 76 44 Z"
            fill="url(#logoMagentaOrange)"
          />
        </svg>
      </div>

      {showText && (
        <span
          className={`font-headline font-bold ${textSize} text-[#111827] tracking-tight flex items-center`}
        >
          ColorCut
        </span>
      )}
    </div>
  );
};
