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
        <div className="text-[12px] text-[#6B7280] text-center md:text-left max-w-sm">
          © {new Date().getFullYear()} ColorCut. Client-side neural segmentation running in-browser via WebAssembly. Private, fast, and free.
        </div>

        {/* Navigation / Links Section */}
        <div className="flex flex-col sm:flex-row gap-6 text-[13px] text-center sm:text-left">
          {/* Guides */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-[#111827] uppercase tracking-wider">Guides</span>
            <a
              href="/how-to-make-a-background-transparent"
              className="text-[#6B7280] hover:text-[#4F46E5] hover:underline transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-xs cursor-pointer"
            >
              Transparent PNG Guide
            </a>
            <a
              href="/white-background-for-product-photos"
              className="text-[#6B7280] hover:text-[#4F46E5] hover:underline transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-xs cursor-pointer"
            >
              White Background for Products
            </a>
            <a
              href="/change-photo-background-color"
              className="text-[#6B7280] hover:text-[#4F46E5] hover:underline transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-xs cursor-pointer"
            >
              Change Background Color
            </a>
          </div>

          {/* About & Legal */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-[#111827] uppercase tracking-wider">Product &amp; Legal</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              <a
                href="/how-it-works"
                className="text-[#6B7280] hover:text-[#4F46E5] hover:underline transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-xs cursor-pointer"
              >
                How It Works
              </a>
              <a
                href="/about"
                className="text-[#6B7280] hover:text-[#4F46E5] hover:underline transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-xs cursor-pointer"
              >
                About
              </a>
              <a
                href="/privacy"
                className="text-[#6B7280] hover:text-[#4F46E5] hover:underline transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-xs cursor-pointer"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="text-[#6B7280] hover:text-[#4F46E5] hover:underline transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-xs cursor-pointer"
              >
                Terms
              </a>
              <button
                type="button"
                onClick={() => onOpenLegalModal('feedback')}
                className="text-[#6B7280] hover:text-[#4F46E5] hover:underline transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-xs cursor-pointer"
              >
                Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
