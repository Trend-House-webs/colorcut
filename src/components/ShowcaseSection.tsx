import React, { useState } from 'react';
import { ComparisonState } from '../types';

interface ShowcaseSectionProps {
  customOriginalUrl?: string;
  customCutoutUrl?: string;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
  customOriginalUrl,
  customCutoutUrl,
}) => {
  const [activeTab, setActiveTab] = useState<ComparisonState>('solid');
  const [studioColor, setStudioColor] = useState<string>('#4F46E5');

  // Grounded assets: Product photograph with verified pixel-matched transparent cutout
  const originalImage = customOriginalUrl || '/assets/samples/headphones_original.jpg';
  const cutoutImage = customCutoutUrl || '/assets/samples/headphones_transparent.png';

  const studioSwatches = [
    { hex: '#4F46E5', label: 'Indigo' },
    { hex: '#0284C7', label: 'Sky Blue' },
    { hex: '#10B981', label: 'Emerald' },
    { hex: '#FEF3C7', label: 'Warm Beige' },
    { hex: '#F1F5F9', label: 'Clean Slate' },
    { hex: '#FFFFFF', label: 'Crisp White' },
    { hex: '#0F172A', label: 'Charcoal' },
    { hex: '#EC4899', label: 'Rose' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#E5E7EB]" id="three-states">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
          <div>
            <span className="text-[12px] font-semibold text-[#4F46E5] uppercase tracking-wider">
              Visual Demonstration
            </span>
            <h2 className="text-[26px] sm:text-[34px] font-headline font-bold text-[#111827] mt-1 tracking-tight">
              See the Magic: Three Visual States
            </h2>
            <p className="text-[15px] text-[#6B7280] mt-1.5 max-w-2xl">
              Inspect how the AI segments fine edges, preserves transparent alpha channels, and renders vibrant solid backgrounds without altering the subject.
            </p>
          </div>

          {/* Quick Focus Tabs for Small Screens */}
          <div className="inline-flex p-1 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('original')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
                activeTab === 'original'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Original
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cutout')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
                activeTab === 'cutout'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Cutout (Alpha)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('solid')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
                activeTab === 'solid'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Solid Background
            </button>
          </div>
        </div>

        {/* The 3 Comparison Cards Grid — Same subject, same crop, same orientation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Panel 1: Original Image */}
          <div
            className={`rounded-2xl border bg-white overflow-hidden transition-all duration-200 flex flex-col ${
              activeTab === 'original'
                ? 'border-[#4F46E5] ring-2 ring-[#4F46E5]/20 shadow-md'
                : 'border-[#E5E7EB] shadow-xs hover:shadow-sm'
            }`}
          >
            <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
              <span className="text-[14px] font-semibold text-[#111827] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#F3F4F6] text-[#4B5563] flex items-center justify-center text-[11px] font-bold">
                  1
                </span>
                Original Image
              </span>
              <span className="text-[11px] text-[#6B7280] bg-[#F3F4F6] px-2.5 py-0.5 rounded-full font-medium">
                Unedited Background
              </span>
            </div>

            <div className="h-72 sm:h-80 relative overflow-hidden bg-[#F9FAFB] flex items-center justify-center p-3">
              <img
                src={originalImage}
                alt="Original subject with original visible background"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain select-none"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#111827] px-2.5 py-1 rounded-lg text-[11px] font-medium border border-[#E5E7EB] shadow-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#6B7280]">photo_camera</span>
                <span>Original Photograph</span>
              </div>
            </div>
          </div>

          {/* Panel 2: Transparent Cutout */}
          <div
            className={`rounded-2xl border bg-white overflow-hidden transition-all duration-200 flex flex-col ${
              activeTab === 'cutout'
                ? 'border-[#4F46E5] ring-2 ring-[#4F46E5]/20 shadow-md'
                : 'border-[#E5E7EB] shadow-xs hover:shadow-sm'
            }`}
          >
            <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
              <span className="text-[14px] font-semibold text-[#111827] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E0E7FF] text-[#4F46E5] flex items-center justify-center text-[11px] font-bold">
                  2
                </span>
                Transparent Cutout
              </span>
              <span className="text-[11px] text-[#4F46E5] font-semibold bg-indigo-50 px-2.5 py-0.5 rounded-full">
                Alpha PNG
              </span>
            </div>

            <div className="h-72 sm:h-80 relative checkerboard-pattern flex items-center justify-center p-3">
              <img
                src={cutoutImage}
                alt="Flawless transparent cutout on checkerboard pattern"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain select-none"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-[#111827] px-2.5 py-1 rounded-lg text-[11px] font-medium border border-[#E5E7EB] shadow-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#4F46E5]">grid_view</span>
                <span>Checkerboard Transparency</span>
              </div>
            </div>
          </div>

          {/* Panel 3: Solid Background Color (Compositing strictly BEHIND the transparent subject) */}
          <div
            className={`rounded-2xl border bg-white overflow-hidden transition-all duration-200 flex flex-col ${
              activeTab === 'solid'
                ? 'border-[#4F46E5] ring-2 ring-[#4F46E5]/20 shadow-md'
                : 'border-[#E5E7EB] shadow-xs hover:shadow-sm'
            }`}
          >
            <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white flex-wrap gap-2">
              <span className="text-[14px] font-semibold text-[#111827] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E0E7FF] text-[#4F46E5] flex items-center justify-center text-[11px] font-bold">
                  3
                </span>
                Solid Background
              </span>

              {/* Dynamic Interactive Swatches */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {studioSwatches.map(swatch => (
                  <button
                    key={swatch.hex}
                    type="button"
                    onClick={() => {
                      setStudioColor(swatch.hex);
                      setActiveTab('solid');
                    }}
                    title={swatch.label}
                    style={{ backgroundColor: swatch.hex }}
                    aria-label={`Select ${swatch.label} background`}
                    className={`w-5 h-5 rounded-full transition-transform hover:scale-115 border border-[#E5E7EB] cursor-pointer ${
                      studioColor === swatch.hex
                        ? 'ring-2 ring-[#4F46E5] ring-offset-1 scale-110'
                        : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Canvas layer: The solid background is applied ONLY behind the transparent PNG */}
            <div
              className="h-72 sm:h-80 relative flex items-center justify-center p-3 transition-colors duration-200"
              style={{ backgroundColor: studioColor }}
            >
              <img
                src={cutoutImage}
                alt="Subject composited over chosen solid background"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain select-none"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-[#111827] px-2.5 py-1 rounded-lg text-[11px] font-medium border border-[#E5E7EB] shadow-xs flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#4F46E5]">palette</span>
                <span>Solid Fill: <strong className="font-mono">{studioColor}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
