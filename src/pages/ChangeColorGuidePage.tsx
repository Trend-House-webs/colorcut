import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LegalModal, LegalDocType } from '../components/LegalPages';
import { COLOR_PRESETS } from '../data/samples';

interface ChangeColorGuidePageProps {
  onNavigateHome: () => void;
  onTriggerUpload: () => void;
  onOpenHelpModal: () => void;
}

export const ChangeColorGuidePage: React.FC<ChangeColorGuidePageProps> = ({
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
      title: 'Upload Any Photo to ColorCut',
      description:
        'Choose any portrait, headshot, product photo, or graphic in JPG, PNG, or WebP format up to 10 MB. No login, account creation, or payment is required to use our background color changer.',
    },
    {
      num: '02',
      title: 'Stage 1: AI Isolates the Transparent Cutout',
      description:
        'The neural network segmentation engine (isnet_fp16) analyzes the image in your browser memory via WebAssembly. It separates the subject from the original background, producing a 32-bit alpha transparency mask.',
    },
    {
      num: '03',
      title: 'Stage 2: Select a Color Preset or Enter Custom HEX',
      description:
        'Choose from 17 curated solid color presets—including corporate navy, studio white, warm beige, charcoal black, or emerald green—or type any custom 6-character HEX color code to match your exact brand guidelines.',
    },
    {
      num: '04',
      title: 'Preview and Download Full Resolution',
      description:
        'Preview the composited image in real time. Download as a high-quality solid-color JPG for resumes and websites, or export as a transparent PNG for graphic design overlays. Zero watermarks added.',
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header
        currentView="change-color-guide"
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
              <a href="/how-it-works" className="hover:text-[#4F46E5] transition-colors">
                How It Works
              </a>
              <span>/</span>
              <span className="text-[#111827] font-medium">Change Photo Background Color</span>
            </nav>

            <span className="text-[12px] font-semibold text-[#4F46E5] uppercase tracking-wider">
              Studio Color Replacement Tutorial
            </span>
            <h1 className="text-[32px] sm:text-[42px] font-headline font-bold text-[#111827] mt-1.5 tracking-tight">
              Change a Photo Background Color Online
            </h1>
            <p className="text-[16px] text-[#6B7280] mt-3 leading-relaxed max-w-3xl">
              Remove an image background and choose a solid background color online with ColorCut. Preview your result in real time and download full-resolution finished images with zero watermarks.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-[#6B7280]">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]"></span>
                17 Presets + Custom HEX
              </span>
              <span>•</span>
              <span>In-Browser Processing • Free &amp; Private</span>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 space-y-12">
            
            {/* Direct Answer Summary */}
            <div className="p-6 sm:p-8 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB]">
              <h2 className="text-[20px] font-headline font-bold text-[#111827] mb-2">
                How to Change Photo Background Color Online
              </h2>
              <p className="text-[15px] text-[#4B5563] leading-relaxed mb-4">
                Changing an image background color with ColorCut involves two simple automated stages:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-[14px] text-[#374151]">
                <li><strong>Remove original backdrop:</strong> Upload any photo; ColorCut automatically cuts out the subject into an alpha transparency channel.</li>
                <li><strong>Pick your new solid color:</strong> Choose from 17 curated color presets or enter a custom 6-digit hex code.</li>
                <li><strong>Instant canvas compositing:</strong> The solid color renders strictly behind the subject, preserving all original foreground details.</li>
                <li><strong>Download full-resolution export:</strong> Download as a clean solid-color JPG or keep a transparent PNG copy.</li>
              </ol>
            </div>

            {/* The Two-Stage In-Browser Workflow */}
            <div className="space-y-4">
              <h2 className="text-[22px] sm:text-[26px] font-headline font-bold text-[#111827]">
                The Two-Stage In-Browser Workflow
              </h2>
              <p className="text-[15px] text-[#4B5563] leading-relaxed">
                Unlike complex graphic design suites that require manual pen tool tracing or magic wand adjustments, ColorCut automates the process into two distinct, high-fidelity stages:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-[#111827] text-[15px]">
                    <span className="w-6 h-6 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#4F46E5] text-[12px] font-bold">1</span>
                    Stage 1: Neural Alpha Segmentation
                  </div>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed">
                    The in-browser AI model (isnet_fp16) scans the image matrix to separate foreground hair, skin, and clothing from the background, creating a 32-bit transparent cutout without uploading your photo.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-[#111827] text-[15px]">
                    <span className="w-6 h-6 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#4F46E5] text-[12px] font-bold">2</span>
                    Stage 2: Precision Canvas Compositing
                  </div>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed">
                    ColorCut renders the chosen solid color onto an HTML5 Canvas layer positioned directly underneath the transparent cutout, creating a flawless solid-color portrait or product image.
                  </p>
                </div>
              </div>
            </div>

            {/* 17 Curated Presets and Custom HEX Picker */}
            <div className="space-y-4">
              <h2 className="text-[22px] sm:text-[26px] font-headline font-bold text-[#111827]">
                17 Curated Solid Color Presets &amp; Custom HEX Picker
              </h2>
              <p className="text-[15px] text-[#4B5563] leading-relaxed">
                ColorCut includes an extensive palette of solid studio tones designed for common photographic and professional requirements, plus a custom HEX picker for exact hex code matching:
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1">
                {COLOR_PRESETS.map((p, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E5E7EB] bg-white text-[13px] font-medium text-[#111827] shadow-2xs"
                  >
                    <span
                      className="w-4 h-4 rounded-md border border-[#D1D5DB] shrink-0"
                      style={{
                        backgroundColor: p.value === 'transparent' ? '#FFFFFF' : p.value,
                        backgroundImage: p.value === 'transparent' ? 'repeating-conic-gradient(#E5E7EB 0% 25%, transparent 0% 50%) 50% / 8px 8px' : undefined
                      }}
                    />
                    <span>{p.name}</span>
                    {p.textHex && (
                      <span className="text-[11px] font-mono text-[#6B7280]">#{p.textHex}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Tips for Choosing Colors */}
            <div className="space-y-4">
              <h2 className="text-[22px] sm:text-[26px] font-headline font-bold text-[#111827]">
                Practical Tips for Selecting the Right Background Color
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <div className="font-semibold text-[#111827]">Professional Resumes &amp; LinkedIn (Navy or Light Gray)</div>
                  <p className="text-[#6B7280] leading-relaxed">
                    Change image background color to blue (#1E3A8A or #2563EB) or light slate (#F3F4F6) for an authoritative, clean executive headshot that stands out on recruitment profiles.
                  </p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <div className="font-semibold text-[#111827]">E-Commerce &amp; Product Catalogs (Pure White)</div>
                  <p className="text-[#6B7280] leading-relaxed">
                    Select pure white (#FFFFFF) for product photos on eBay, Amazon, Etsy, or Shopify to maintain compliance with marketplace catalog standards.
                  </p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <div className="font-semibold text-[#111827]">Social Media Avatars &amp; Creator Profiles (Vibrant Tones)</div>
                  <p className="text-[#6B7280] leading-relaxed">
                    Use high-contrast backdrop tones like Emerald Green (#22C55E), Yellow (#FACC15), or Purple (#9333EA) to make circular profile avatars instantly recognizable in mobile feeds.
                  </p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <div className="font-semibold text-[#111827]">Document &amp; ID Photos (Neutral Off-White)</div>
                  <p className="text-[#6B7280] leading-relaxed">
                    Select light gray or off-white presets for centered portraits. Note: Always check specific official photo specifications with your local issuing authority.
                  </p>
                </div>
              </div>
            </div>

            {/* Solid Color vs AI Scene Hallucination */}
            <div className="p-6 sm:p-8 bg-white border border-[#E5E7EB] rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#4F46E5]">palette</span>
                <h2 className="text-[19px] font-headline font-bold text-[#111827]">
                  Solid Color Replacement vs. Generated AI Background Scenes
                </h2>
              </div>
              <p className="text-[14px] text-[#4B5563] leading-relaxed">
                ColorCut is a dedicated solid background color changer. It does not synthesize imaginary outdoor scenery, virtual coffee shops, or generative AI room backgrounds.
              </p>
              <p className="text-[14px] text-[#4B5563] leading-relaxed">
                This is a deliberate architectural advantage: generative background tools frequently introduce lighting mismatches, warped perspective angles, and synthetic artifacts. ColorCut's solid-color replacement preserves the natural lighting, shadows, and true color accuracy of your original subject.
              </p>
            </div>

            {/* Supported Formats and Limitations */}
            <div className="p-6 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-3">
              <h3 className="font-headline font-semibold text-[17px] text-[#111827]">
                Supported Formats &amp; Technical Notes
              </h3>
              <ul className="text-[13px] text-[#4B5563] space-y-1.5 list-disc pl-5">
                <li><strong>Supported Inputs:</strong> Single JPG, PNG, or WebP photo up to 10 MB.</li>
                <li><strong>Single Photo Workflow:</strong> ColorCut processes one photo at a time; batch multi-photo conversion is not supported.</li>
                <li><strong>Private In-Memory Execution:</strong> Neural model inference runs locally via WebAssembly with zero server photo uploads.</li>
                <li><strong>Initial Model Weight Cache:</strong> First run downloads model weights (~20–40 MB) from CDN and caches them locally for subsequent speed.</li>
              </ul>
            </div>

            {/* Questions & Direct Answers (AEO) */}
            <div className="pt-8 border-t border-[#E5E7EB] space-y-6">
              <div>
                <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-1">
                  Frequently Asked Questions About Changing Background Colors
                </h2>
                <p className="text-[14px] text-[#6B7280]">
                  Direct answers to common questions about solid background colors, HEX values, and edge blending.
                </p>
              </div>

              <div className="space-y-4 text-[14px]">
                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Can I change an image background to a custom solid color?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    Yes. ColorCut provides 17 curated solid color presets (including studio white, neutral grays, deep navy, vibrant greens, and pastels) plus a custom HEX picker (<code className="text-[#4F46E5] font-mono">#RRGGBB</code>) allowing you to match any brand or creative palette.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Can ColorCut replace a photo background with an outdoor scene or photograph?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    No. ColorCut is dedicated to precision solid-color studio backgrounds and transparent cutouts. It does not replace backdrops with external photographs or generate synthetic AI backgrounds.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    How does ColorCut blend edges when applying dark or vibrant colors?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    ColorCut uses sub-pixel 2D canvas alpha compositing. The neural network calculates partial transparency values along hair strands and soft borders, allowing the new solid color to blend naturally without harsh jagged outlines.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    What export format should I choose for solid-color backgrounds?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    For solid-color backgrounds, choose JPG. A high-quality solid-color JPG yields a smaller file size than PNG while maintaining crisp subject details, making it ideal for profile headshots, e-commerce listings, and web pages.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Guides & Internal Links */}
            <div className="pt-8 border-t border-[#E5E7EB]">
              <h2 className="text-[18px] font-headline font-bold text-[#111827] mb-3">
                Related Guides &amp; Tutorials
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px]">
                <a
                  href="/white-background-for-product-photos"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">White Background for Products</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">E-commerce white photo guide</span>
                </a>
                <a
                  href="/how-to-make-a-background-transparent"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">Transparent PNG Guide</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">Export 32-bit alpha cutouts</span>
                </a>
                <a
                  href="/how-it-works"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">How ColorCut Works</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">In-browser 3-step workflow</span>
                </a>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-headline font-semibold text-[18px] text-[#111827]">
                  Change a photo background color now
                </h3>
                <p className="text-[13px] text-[#6B7280] mt-0.5">
                  Upload your photo to ColorCut. Choose from 17 presets or pick any custom HEX color.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.history) {
                    window.history.pushState({}, '', '/');
                  }
                  onNavigateHome();
                  setTimeout(() => onTriggerUpload(), 100);
                }}
                className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">palette</span>
                <span>Open Background Color Tool</span>
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
