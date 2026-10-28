import React, { useState } from 'react';
import { ViewState } from '../types';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentView: ViewState;
  onNavigateHome: () => void;
  onTriggerUpload: () => void;
  onOpenHelpModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateHome,
  onTriggerUpload,
  onOpenHelpModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'home') {
      onNavigateHome();
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40">
        <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-12 max-w-7xl mx-auto h-16">
          {/* Brand Logo & Name (No "FREE TOOL" label) */}
          <button
            type="button"
            onClick={onNavigateHome}
            aria-label="ColorCut Home"
            className="flex items-center text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-xl cursor-pointer"
          >
            <BrandLogo size={36} />
          </button>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 text-[14px]">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
                scrollToSection('hero');
              }}
              className={`font-medium transition-colors hover:text-[#4F46E5] cursor-pointer ${
                currentView === 'home'
                  ? 'text-[#4F46E5] font-semibold'
                  : 'text-[#6B7280]'
              }`}
            >
              Home
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('how-it-works');
              }}
              className="text-[#6B7280] hover:text-[#111827] font-medium transition-colors cursor-pointer"
            >
              How It Works
            </a>
            <a
              href="#three-states"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('three-states');
              }}
              className="text-[#6B7280] hover:text-[#111827] font-medium transition-colors cursor-pointer"
            >
              Demonstration
            </a>
            <a
              href="#use-cases"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('use-cases');
              }}
              className="text-[#6B7280] hover:text-[#111827] font-medium transition-colors cursor-pointer"
            >
              Use Cases
            </a>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('faq');
              }}
              className="text-[#6B7280] hover:text-[#111827] font-medium transition-colors cursor-pointer"
            >
              FAQ
            </a>
          </nav>

          {/* Trailing Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              aria-label="Help & Guide"
              onClick={onOpenHelpModal}
              title="How to use ColorCut"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">help_outline</span>
            </button>

            <button
              type="button"
              onClick={onTriggerUpload}
              className="bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white text-[13px] sm:text-[14px] px-3.5 sm:px-4 py-2 rounded-xl font-medium shadow-xs transition-all flex items-center gap-1.5 whitespace-nowrap focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
              <span className="hidden sm:inline">Upload Image</span>
              <span className="sm:hidden text-[12px]">Upload</span>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              aria-label="Open mobile navigation menu"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-[#F3F4F6] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative bg-white w-4/5 max-w-[320px] h-full p-6 shadow-xl flex flex-col justify-between z-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                <BrandLogo size={32} />
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>

              <nav className="flex flex-col space-y-3 font-medium">
                <a
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onNavigateHome();
                    scrollToSection('hero');
                  }}
                  className="text-left text-[#4F46E5] font-semibold py-2 px-2 rounded-lg hover:bg-indigo-50"
                >
                  Home
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    scrollToSection('how-it-works');
                  }}
                  className="text-left text-[#4B5563] hover:text-[#111827] py-2 px-2 rounded-lg hover:bg-[#F3F4F6] transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="#three-states"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    scrollToSection('three-states');
                  }}
                  className="text-left text-[#4B5563] hover:text-[#111827] py-2 px-2 rounded-lg hover:bg-[#F3F4F6] transition-colors"
                >
                  Demonstration
                </a>
                <a
                  href="#use-cases"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    scrollToSection('use-cases');
                  }}
                  className="text-left text-[#4B5563] hover:text-[#111827] py-2 px-2 rounded-lg hover:bg-[#F3F4F6] transition-colors"
                >
                  Use Cases
                </a>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    scrollToSection('faq');
                  }}
                  className="text-left text-[#4B5563] hover:text-[#111827] py-2 px-2 rounded-lg hover:bg-[#F3F4F6] transition-colors"
                >
                  FAQ
                </a>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E5E7EB] space-y-3">
              <div className="flex items-center gap-2 text-[#6B7280] text-[12px]">
                <span className="material-symbols-outlined text-[18px] text-[#10B981]">shield</span>
                <span>Private in-browser processing</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onTriggerUpload();
                }}
                className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold py-2.5 rounded-xl shadow-xs text-center flex items-center justify-center gap-2 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                <span>Upload Image</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
