import React, { useState } from 'react';
import { SAMPLE_IMAGES } from '../data/samples';
import { ImageData } from '../types';

interface HeroSectionProps {
  onSelectSample: (sample: ImageData) => void;
  onFileUpload: (file: File) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectSample,
  onFileUpload,
  fileInputRef,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onFileUpload(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onFileUpload(file);
    }
  };

  const handleSampleClick = (sample: ImageData) => {
    setActiveSampleId(sample.id);
    onSelectSample(sample);
  };

  return (
    <section
      className="relative pt-10 pb-16 sm:pt-14 sm:pb-20 md:py-20 bg-white border-b border-[#E5E7EB]"
      id="hero"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Copy Anchor */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-[12px] font-mono text-[#4B5563] font-medium tracking-wide">
              Browser-Direct AI Engine • 100% In-Memory
            </span>
          </div>

          <h1 className="text-[32px] sm:text-[44px] md:text-[54px] font-headline font-extrabold text-[#111827] tracking-tight leading-[1.15] mb-4 text-balance">
            Remove Backgrounds.<br className="hidden sm:inline" />{' '}
            <span className="text-[#4F46E5]">Change Colors. Done.</span>
          </h1>

          <p className="text-[15px] sm:text-[17px] text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Instantly remove image backgrounds and replace them with clean, professional solid colors. Free, simple, and private client-side processing.
          </p>
        </div>

        {/* Prominent Upload Card Area */}
        <div className="max-w-3xl mx-auto" id="upload-card">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4 sm:p-8 md:p-10 transition-all duration-200">
            {/* Dropzone */}
            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-10 md:p-12 text-center transition-all duration-200 cursor-pointer group focus-within:ring-2 focus-within:ring-[#4F46E5] ${
                isDragOver
                  ? 'border-[#4F46E5] bg-indigo-50/40 scale-[1.01]'
                  : 'border-[#CBD5E1] hover:border-[#4F46E5] bg-[#F9FAFB] hover:bg-[#F3F4F6]'
              }`}
              id="drop-zone"
            >
              <input
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                id="file-input"
                type="file"
                aria-label="Upload image file"
                onChange={handleFileChange}
              />

              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-50 group-hover:bg-indigo-100 text-[#4F46E5] mx-auto flex items-center justify-center mb-3 sm:mb-4 transition-colors duration-200 shadow-xs">
                <span className="material-symbols-outlined text-[28px] sm:text-[32px]">cloud_upload</span>
              </div>

              <h2 className="font-headline font-semibold text-[18px] sm:text-[20px] text-[#111827] mb-1">
                Upload Your Image
              </h2>

              <p className="text-[13px] sm:text-[14px] text-[#6B7280] mb-5 sm:mb-6">
                Drag and drop your image here or click browse
              </p>

              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white text-[13px] sm:text-[14px] font-medium px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-xs transition-all duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">add_photo_alternate</span>
                <span>Choose Image</span>
              </button>

              {/* Metadata info */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-5 sm:mt-6 text-[12px] text-[#6B7280]">
                <span className="flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[16px] text-[#10B981]">check_circle</span>
                  JPG, PNG, WebP
                </span>
                <span className="text-[#D1D5DB]">•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#6B7280]">straighten</span>
                  Max 10MB
                </span>
                <span className="text-[#D1D5DB]">•</span>
                <span className="flex items-center gap-1 text-[#4F46E5] font-medium">
                  <span className="material-symbols-outlined text-[16px]">bolt</span>
                  Instant AI processing
                </span>
              </div>
            </div>

            {/* Browser Security Tag */}
            <div className="mt-4 pt-3.5 border-t border-[#E5E7EB] flex items-center justify-center gap-2 text-[12px] text-[#6B7280] text-center">
              <span className="material-symbols-outlined text-[16px] text-[#10B981] shrink-0">shield</span>
              <span>Images are processed locally in your browser memory via WebAssembly.</span>
            </div>
          </div>

          {/* Sample Photos Row (Requirement 3: Male Portrait, Product, Casual Male Portrait) */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
            <span className="text-[12px] uppercase font-semibold text-[#6B7280] tracking-wider text-center sm:text-left">
              Or test with a sample photo:
            </span>

            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center">
              {SAMPLE_IMAGES.map(sample => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSampleClick(sample)}
                  aria-label={`Test background removal with ${sample.category || sample.name}`}
                  className={`group flex items-center gap-2.5 px-3 py-1.5 rounded-xl border bg-white hover:border-[#4F46E5] hover:shadow-xs active:scale-95 transition-all duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer ${
                    activeSampleId === sample.id
                      ? 'border-[#4F46E5] ring-2 ring-[#4F46E5]/25 bg-indigo-50/20'
                      : 'border-[#E5E7EB]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#F3F4F6] shrink-0 border border-[#E5E7EB]">
                    <img
                      src={sample.originalUrl}
                      alt={sample.category || sample.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[12px] sm:text-[13px] font-medium text-[#111827] group-hover:text-[#4F46E5] transition-colors">
                    {sample.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
