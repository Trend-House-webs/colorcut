import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LegalModal, LegalDocType } from '../components/LegalPages';
import { SAMPLE_IMAGES, COLOR_PRESETS } from '../data/samples';

interface HowItWorksPageProps {
  onNavigateHome: () => void;
  onTriggerUpload: () => void;
  onOpenHelpModal: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onNavigateHome,
  onTriggerUpload,
  onOpenHelpModal,
}) => {
  const [legalModalOpen, setLegalModalOpen] = React.useState(false);
  const [legalDoc, setLegalDoc] = React.useState<LegalDocType>('api');

  const handleOpenLegal = (doc: LegalDocType) => {
    setLegalDoc(doc);
    setLegalModalOpen(true);
  };

  const steps = [
    {
      num: '01',
      title: 'Upload Your Image',
      subtitle: 'Input specifications and device memory ingestion',
      description:
        'Choose any JPG, PNG, or WebP photo up to 10MB from your computer, phone, or tablet. Your file is read immediately into local browser memory via standard FileReader and Canvas APIs. No file is uploaded to an external server.',
      icon: 'cloud_upload',
      highlights: ['Formats: JPG, PNG, WebP', 'Max File Size: 10MB', '100% Client-Side Ingestion'],
    },
    {
      num: '02',
      title: 'Neural Background Segmentation',
      subtitle: 'In-browser ONNX inference isolating fine edges and hair',
      description:
        'The neural network model (isnet_fp16) analyzes luminance, subject edges, and foreground depth using WebAssembly. It generates a sub-pixel alpha transparency mask isolating the subject from distracting domestic, outdoor, or cluttered studio backdrops.',
      icon: 'auto_awesome',
      highlights: ['Model: isnet_fp16 ONNX', 'Runtime: WebAssembly SIMD', 'Zero Server Uploads'],
    },
    {
      num: '03',
      title: 'Choose a Background Color & Export',
      subtitle: 'Compositing and high-resolution export without watermarks',
      description:
        'Keep the transparent alpha background, choose from 17 curated solid color presets (including pure white, clean slate, corporate navy, or vibrant creator colors), or pick any custom HEX color code. Export full-resolution transparent PNG or solid-color JPG images with zero watermarks.',
      icon: 'palette',
      highlights: ['17 Curated Presets + HEX Picker', 'Full Original Resolution', 'Zero Watermarks'],
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header
        currentView="how-it-works"
        onNavigateHome={onNavigateHome}
        onTriggerUpload={onTriggerUpload}
        onOpenHelpModal={onOpenHelpModal}
      />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-[#F9FAFB] border-b border-[#E5E7EB] py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-[#6B7280] mb-4">
              <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:text-[#4F46E5] transition-colors">
                Home
              </a>
              <span>/</span>
              <span className="text-[#111827] font-medium">How It Works</span>
            </nav>

            <span className="text-[12px] font-semibold text-[#4F46E5] uppercase tracking-wider">
              Step-by-Step Workflow Guide
            </span>
            <h1 className="text-[32px] sm:text-[42px] font-headline font-bold text-[#111827] mt-1.5 tracking-tight">
              How ColorCut Works
            </h1>
            <p className="text-[16px] text-[#6B7280] mt-3 leading-relaxed">
              Learn how ColorCut isolates photo subjects with sub-pixel alpha precision and composites vibrant solid background colors directly in your browser.
            </p>
            <div className="mt-4 flex items-center gap-3 text-[12px] text-[#6B7280]">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]"></span>
                3 Simple Steps
              </span>
              <span>•</span>
              <span>Full Resolution • No Watermarks</span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 space-y-12">
            
            {/* The 3 Steps Detailed */}
            <div className="space-y-8">
              {steps.map(step => (
                <div
                  key={step.num}
                  className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-xs hover:border-indigo-200 transition-all flex flex-col md:flex-row gap-6 items-start"
                >
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#4F46E5] shrink-0 font-headline font-bold text-[18px]">
                    {step.num}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827]">
                        {step.title}
                      </h2>
                      <span className="text-[12px] text-[#4F46E5] font-semibold uppercase tracking-wider">
                        {step.subtitle}
                      </span>
                    </div>

                    <p className="text-[15px] text-[#4B5563] leading-relaxed">
                      {step.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {step.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[12px] font-medium px-2.5 py-1 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-[#374151]"
                        >
                          <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span>
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Supported Input & Output Formats Card */}
            <div className="bg-[#F9FAFB] p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] space-y-6">
              <div>
                <h2 className="text-[20px] font-headline font-bold text-[#111827] mb-1">
                  Verified Format Specifications
                </h2>
                <p className="text-[14px] text-[#6B7280]">
                  Hardware-optimized file guidelines for smooth in-browser performance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-[#E5E7EB]">
                  <div className="flex items-center gap-2 font-semibold text-[#111827] text-[15px] mb-2">
                    <span className="material-symbols-outlined text-[#4F46E5] text-[20px]">input</span>
                    Supported Inputs
                  </div>
                  <ul className="text-[13px] text-[#4B5563] space-y-1.5 list-disc pl-5">
                    <li>JPG / JPEG (Standard photo compression)</li>
                    <li>PNG (24-bit or 32-bit images)</li>
                    <li>WebP (Modern web format)</li>
                    <li>Maximum recommended file size: <strong>10 MB</strong></li>
                  </ul>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#E5E7EB]">
                  <div className="flex items-center gap-2 font-semibold text-[#111827] text-[15px] mb-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[20px]">output</span>
                    Supported Outputs
                  </div>
                  <ul className="text-[13px] text-[#4B5563] space-y-1.5 list-disc pl-5">
                    <li><strong>Transparent PNG:</strong> Lossless 32-bit alpha channel</li>
                    <li><strong>Solid Color JPG:</strong> 24-bit RGB with chosen solid backdrop</li>
                    <li><strong>Full Resolution:</strong> Pixel-for-pixel original dimensions</li>
                    <li><strong>Zero Watermarks:</strong> Clean, unbranded export</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Presets and Custom Color Information */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-3">
                17 Curated Solid Color Presets &amp; Custom HEX Picker
              </h2>
              <p className="text-[15px] text-[#4B5563] mb-4 leading-relaxed">
                Once the background is separated, you can instantly apply any of our studio color presets designed for e-commerce, portraits, and social media, or enter any 6-digit hex code:
              </p>

              <div className="flex flex-wrap gap-2">
                {COLOR_PRESETS.map((preset, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white text-[12px] font-medium text-[#374151]"
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-md border border-[#D1D5DB] shrink-0"
                      style={{
                        backgroundColor: preset.value === 'transparent' ? '#FFFFFF' : preset.value,
                        backgroundImage: preset.value === 'transparent' ? 'repeating-conic-gradient(#E5E7EB 0% 25%, transparent 0% 50%) 50% / 8px 8px' : undefined
                      }}
                    />
                    {preset.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Links */}
            <div className="pt-8 border-t border-[#E5E7EB]">
              <h2 className="text-[17px] font-headline font-semibold text-[#111827] mb-3">
                Related Pages
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="/about"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">About ColorCut</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">Architecture and mission</span>
                </a>
                <a
                  href="/privacy"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">Privacy Policy</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">In-browser data guarantees</span>
                </a>
                <a
                  href="/terms"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">Terms of Use</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">Licensing and usage rules</span>
                </a>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="p-6 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-headline font-semibold text-[17px] text-[#111827]">
                  Ready to test background removal?
                </h3>
                <p className="text-[13px] text-[#6B7280] mt-0.5">
                  Upload an image or start with one of our curated portrait or product samples.
                </p>
              </div>
              <button
                type="button"
                onClick={onTriggerUpload}
                className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                <span>Upload Image Now</span>
              </button>
            </div>

          </div>
        </section>
      </main>

      <Footer
        onOpenLegalModal={handleOpenLegal}
        onNavigateHome={onNavigateHome}
      />

      <LegalModal
        isOpen={legalModalOpen}
        initialDoc={legalDoc}
        onClose={() => setLegalModalOpen(false)}
      />
    </div>
  );
};
