import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LegalModal, LegalDocType } from '../components/LegalPages';

interface WhiteBackgroundGuidePageProps {
  onNavigateHome: () => void;
  onTriggerUpload: () => void;
  onOpenHelpModal: () => void;
}

export const WhiteBackgroundGuidePage: React.FC<WhiteBackgroundGuidePageProps> = ({
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
      title: 'Upload a Single Product Photograph',
      description:
        'Select any JPG, PNG, or WebP product photo up to 10 MB. For the cleanest cutout, photograph your item in balanced lighting with some visual contrast against the initial background.',
    },
    {
      num: '02',
      title: 'Automatic Neural Background Removal',
      description:
        'ColorCut runs in-browser neural segmentation using the isnet_fp16 model via WebAssembly. It isolates the product edges, contours, and physical silhouette without transmitting your photo to an external cloud server.',
    },
    {
      num: '03',
      title: 'Select Pure White (#FFFFFF) Preset',
      description:
        'Click the "White" color swatch in ColorCut\'s preset palette. The tool composites a pure #FFFFFF backdrop directly behind your transparent product cutout with pixel precision.',
    },
    {
      num: '04',
      title: 'Inspect Edge Quality and Export',
      description:
        'Review the product edges against the pure white canvas to ensure clean separation. When satisfied, download a high-resolution solid-color JPG for web catalogs or a transparent PNG for flexible design overlays.',
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header
        currentView="white-background-guide"
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
              <span className="text-[#111827] font-medium">White Background for Product Photos</span>
            </nav>

            <span className="text-[12px] font-semibold text-[#4F46E5] uppercase tracking-wider">
              E-Commerce Image Guide
            </span>
            <h1 className="text-[32px] sm:text-[42px] font-headline font-bold text-[#111827] mt-1.5 tracking-tight">
              Make Product Photo Backgrounds White Online
            </h1>
            <p className="text-[16px] text-[#6B7280] mt-3 leading-relaxed max-w-3xl">
              Remove a product photo's background and give it a solid white background with ColorCut's browser-based image tool. Perfect for online store listings, catalog shots, and clean marketplace presentations.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-[#6B7280]">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]"></span>
                Pure White (#FFFFFF)
              </span>
              <span>•</span>
              <span>Single-Item Workflow • 100% Free &amp; Private</span>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 space-y-12">
            
            {/* Direct Answer Summary */}
            <div className="p-6 sm:p-8 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB]">
              <h2 className="text-[20px] font-headline font-bold text-[#111827] mb-2">
                How to Change a Photo Background to White Online
              </h2>
              <p className="text-[15px] text-[#4B5563] leading-relaxed mb-4">
                To create a white background for product photos with ColorCut:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-[14px] text-[#374151]">
                <li><strong>Upload your product photo:</strong> Select your single product image (JPG, PNG, or WebP up to 10 MB).</li>
                <li><strong>In-browser background removal:</strong> ColorCut isolates the product silhouette locally in your device's memory.</li>
                <li><strong>Select White (#FFFFFF):</strong> Choose the White swatch from the 17 color presets.</li>
                <li><strong>Export full resolution:</strong> Download the clean solid-color JPG or keep a transparent PNG copy for future edits.</li>
              </ol>
            </div>

            {/* Which product photos suit the tool */}
            <div className="space-y-4">
              <h2 className="text-[22px] sm:text-[26px] font-headline font-bold text-[#111827]">
                Which Product Photographs Suit ColorCut?
              </h2>
              <p className="text-[15px] text-[#4B5563] leading-relaxed">
                ColorCut is optimized for single-item product photography where you need to change photo background to white quickly without launching heavy desktop software like Photoshop.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-[13px]">
                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] shadow-xs space-y-2">
                  <div className="font-semibold text-emerald-700 flex items-center gap-1.5 text-[14px]">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    Ideal Product Types
                  </div>
                  <ul className="text-[#4B5563] space-y-1.5 list-disc pl-5">
                    <li>Electronics (headphones, gadgets, accessories)</li>
                    <li>Packaged retail goods, bottles, boxes, and cosmetics</li>
                    <li>Footwear, shoes, handbags, and accessories with clear edges</li>
                    <li>Crafts, jewelry, and handmade items photographed on desks</li>
                  </ul>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] shadow-xs space-y-2">
                  <div className="font-semibold text-amber-700 flex items-center gap-1.5 text-[14px]">
                    <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                    Helpful Photography Tips
                  </div>
                  <ul className="text-[#4B5563] space-y-1.5 list-disc pl-5">
                    <li>Use daylight or balanced room lighting to minimize harsh shadows</li>
                    <li>Avoid placing white products directly on matching white paper</li>
                    <li>Keep the subject in sharp focus without heavy motion blur</li>
                    <li>Leave moderate margins around the item for clean boundary detection</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step by Step Breakdown */}
            <div className="space-y-6">
              <h2 className="text-[22px] sm:text-[26px] font-headline font-bold text-[#111827]">
                Step-by-Step: Making Product Photo Backgrounds White
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {steps.map(s => (
                  <div key={s.num} className="p-5 bg-white rounded-xl border border-[#E5E7EB] shadow-xs space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#4F46E5] font-bold text-[13px]">
                        {s.num}
                      </span>
                      <h3 className="font-headline font-semibold text-[16px] text-[#111827]">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-[13px] text-[#4B5563] leading-relaxed pl-9.5">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Plain White vs AI Generated Scenes */}
            <div className="p-6 sm:p-8 bg-indigo-50/50 border border-indigo-100 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-[#4F46E5]">verified</span>
                <h2 className="text-[19px] font-headline font-bold text-[#111827]">
                  Solid White Background (#FFFFFF) vs. Generated AI Scenes
                </h2>
              </div>
              <p className="text-[14px] text-[#4B5563] leading-relaxed">
                Many modern generative tools attempt to create complex synthetic background scenes (such as virtual marble countertops or outdoor foliage). While visually striking, generated scenes often alter product shadows, introduce mismatched lighting angles, or violate marketplace guidelines requiring pure, uncluttered white backgrounds.
              </p>
              <p className="text-[14px] text-[#4B5563] leading-relaxed">
                ColorCut takes an honest, straightforward approach: we provide genuine, solid-color compositing that places your real product on an authentic pure white (#FFFFFF) backdrop without altering the original colors, labels, or geometry of your product.
              </p>
            </div>

            {/* Transparent Scope & Limitations */}
            <div className="space-y-4">
              <h2 className="text-[22px] sm:text-[26px] font-headline font-bold text-[#111827]">
                Tool Scope &amp; Limitations for Product Photography
              </h2>
              <p className="text-[14px] text-[#6B7280]">
                To ensure ColorCut fits your workflow, keep these realistic capabilities and limits in mind:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px]">
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <div className="font-semibold text-[#111827]">Single-Item Editing</div>
                  <p className="text-[#6B7280]">ColorCut focuses on single-photo editing. We do not provide batch processing of multiple images simultaneously.</p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <div className="font-semibold text-[#111827]">No Synthetic Shadows</div>
                  <p className="text-[#6B7280]">ColorCut removes original backgrounds completely. It does not automatically generate synthetic 3D contact shadows.</p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <div className="font-semibold text-[#111827]">Marketplace Cropping</div>
                  <p className="text-[#6B7280]">ColorCut preserves original pixel dimensions. It does not automatically crop, resize, or center items to specific marketplace aspect ratios.</p>
                </div>
              </div>
            </div>

            {/* What to do if the result is imperfect */}
            <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-2">
              <h3 className="font-headline font-semibold text-[16px] text-[#111827] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-amber-600">tune</span>
                What to do if the cutout has rough edges?
              </h3>
              <p className="text-[13px] text-[#4B5563] leading-relaxed">
                If the product edge appears soft or has small remnants of the original surface, inspect the lighting of your source image. If the item had very low contrast against its original table or shadow, re-taking the photo with a desk lamp positioned to separate the edge will allow the in-browser neural model to isolate the boundary with sub-pixel sharpness.
              </p>
            </div>

            {/* Questions & Direct Answers (AEO) */}
            <div className="pt-8 border-t border-[#E5E7EB] space-y-6">
              <div>
                <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-1">
                  Frequently Asked Questions About White Backgrounds
                </h2>
                <p className="text-[14px] text-[#6B7280]">
                  Direct answers regarding marketplace compliance, product photography, and ColorCut&apos;s capabilities.
                </p>
              </div>

              <div className="space-y-4 text-[14px]">
                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Can I change a photo background to pure white online?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    Yes. Once ColorCut segments your product, select the White preset (<code className="text-[#4F46E5] font-mono">#FFFFFF</code>). ColorCut immediately composites a true, pure white backdrop behind your product and lets you download a high-resolution JPG or PNG.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Does ColorCut create AI-generated product backgrounds or shadows?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    No. ColorCut is specifically designed for clean solid-color studio backgrounds and transparent cutouts. It does not generate synthetic lifestyle scenes, virtual room backdrops, or simulated drop shadows.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Can I process hundreds of product photos in a batch?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    No. ColorCut operates as a focused single-image editor in your browser. Each product photo is inspected, refined, and downloaded individually to guarantee edge accuracy without automated batch errors.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    What is the best format to save white background product photos?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    For e-commerce marketplaces like Amazon, eBay, and Google Shopping, download as a high-quality JPG with a pure white (<code className="text-[#4F46E5] font-mono">#FFFFFF</code>) background. JPG produces smaller file sizes for fast page loading while meeting all marketplace specifications.
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
                  href="/how-to-make-a-background-transparent"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">Transparent PNG Guide</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">Export 32-bit alpha cutouts</span>
                </a>
                <a
                  href="/change-photo-background-color"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">Change Photo Background Color</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">17 color presets &amp; HEX picker</span>
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
                  Make a product photo background white now
                </h3>
                <p className="text-[13px] text-[#6B7280] mt-0.5">
                  Upload your product photo or test with our sample headphone image.
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
                <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                <span>Open Product White BG Tool</span>
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
