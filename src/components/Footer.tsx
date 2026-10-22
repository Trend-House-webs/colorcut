import React from 'react';
import { LegalDocType } from './LegalPages';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenLegalModal: (docType: LegalDocType) => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal, onNavigateHome }) => {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 sm:px-6 md:px-12 max-w-7xl mx-auto py-8 gap-6">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <button
            type="button"
            onClick={onNavigateHome}
            aria-label="ColorCut Home"
            className="flex items-center cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-lg"
          >
            <BrandLogo size={30} textSize="text-[18px]" />
          </button>
          <p className="text-[13px] text-[#6B7280] text-center md:text-left mt-1">
            Remove backgrounds. Choose solid colors. Download in seconds.
          </p>
        </div>

        {/* Accurate Privacy & Processing Statement */}
        <div className="text-[12px] text-[#6B7280] text-center md:text-left max-w-md">
          © {new Date().getFullYear()} ColorCut. Client-side neural segmentation running in-browser via WebAssembly. Private, fast, and free.
        </div>

        {/* Navigation / Legal Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-[13px]">
          <button
            type="button"
            onClick={() => onOpenLegalModal('privacy')}
            className="text-[#6B7280] hover:text-[#4F46E5] hover:underline transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-xs cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => onOpenLegalModal('terms')}
            className="text-[#6B7280] hover:text-[#4F46E5] hover:underline transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-xs cursor-pointer"
          >
            Terms of Use
          </button>
          <button
            type="button"
            onClick={() => onOpenLegalModal('api')}
            className="text-[#6B7280] hover:text-[#4F46E5] hover:underline transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-xs cursor-pointer"
          >
            Architecture
          </button>
          <button
            type="button"
            onClick={() => onOpenLegalModal('feedback')}
            className="text-[#6B7280] hover:text-[#4F46E5] hover:underline transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-xs cursor-pointer"
          >
            Feedback
          </button>
        </div>
      </div>
    </footer>
  );
};
