import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LegalModal, LegalDocType } from '../components/LegalPages';
import { COLOR_PRESETS } from '../data/samples';

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
      title: 'Select a Supported Image',
      subtitle: 'Upload without signup or Photoshop',
      description:
        'Choose any JPG, PNG, or WebP photo up to 10 MB from your computer, smartphone, or tablet. If you wonder "how do I remove background from image online free without Photoshop," ColorCut lets you begin immediately with zero account registration, no email entry, and no software installations.',
      icon: 'add_photo_alternate',
      highlights: ['Formats: JPG, PNG, WebP', 'Max File Size: 10 MB', 'No Sign-Up Required'],
    },
    {
      num: '02',
      title: 'Allow the AI Model to Process Locally',
      subtitle: 'In-browser neural segmentation via WebAssembly',
      description:
        'The neural network segmentation engine (isnet_fp16) executes directly inside your browser memory using WebAssembly. On your very first use, your device downloads the neural model weights (approx. 20–40 MB) from our CDN. The browser then caches the weights locally for subsequent runs, so your actual photos are never transmitted to external cloud servers.',
      icon: 'auto_awesome',
      highlights: ['Model: isnet_fp16 ONNX', 'Client-Side WebAssembly', 'Cached Model Weights'],
    },
    {
      num: '03',
      title: 'Review the Transparent Cutout',
      subtitle: 'Verify edge boundaries and fine alpha detail',
      description:
        'Inspect the isolated subject rendered against an industry-standard checkerboard transparency grid. The AI separates foreground hair, shoulders, clothing, or product edges from complex backgrounds. If the original image had low contrast between subject and background or translucent fabrics, you can preview the edge quality before proceeding.',
      icon: 'grid_view',
      highlights: ['Alpha Transparency Grid', 'Edge Precision Review', 'Real-Time Zoom & Pan'],
    },
    {
      num: '04',
      title: 'Choose a Solid Background Color (Optional)',
      subtitle: '17 curated presets or custom HEX color picker',
      description:
        'If you want to change image background color or create clean catalog imagery, select from 17 curated solid color presets (such as crisp white, clean slate, corporate navy, or warm beige) or enter any custom 6-character HEX code. The solid color is composited directly behind the transparent cutout without modifying the subject.',
      icon: 'palette',
      highlights: ['17 Curated Presets', 'Custom HEX Color Picker', 'Instant Canvas Compositing'],
    },
    {
      num: '05',
      title: 'Download Your Full-Resolution Output',
      subtitle: 'Transparent PNG or solid-color JPG with zero watermarks',
      description:
        'Select your preferred export format: save as a transparent PNG to preserve full 32-bit alpha transparency for graphics design, or export as a high-quality solid-color JPG for resumes, e-commerce listings, and profile photos. All downloads are generated at 100% original pixel resolution with zero watermarks.',
      icon: 'download',
      highlights: ['Lossless PNG or RGB JPG', 'Full Original Resolution', 'Zero Watermarks'],
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
              How to Remove a Background from an Image Online
            </h1>
            <p className="text-[16px] text-[#6B7280] mt-3 leading-relaxed">
              A comprehensive guide on how to remove background from image online without Photoshop, isolate transparent subjects, and change photo background colors directly in your web browser.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-[#6B7280]">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]"></span>
                5 Clear Steps
              </span>
              <span>•</span>
              <span>100% Free • No Sign-Up • Full Resolution</span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 space-y-12">
            
            {/* The 5 Steps Detailed */}
            <div className="space-y-6">
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

            {/* Transparent PNG vs Solid Color JPG Comparison Card */}
            <div className="bg-[#F9FAFB] p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] space-y-6">
              <div>
                <h2 className="text-[20px] font-headline font-bold text-[#111827] mb-1">
                  Format Guide: Transparent PNG vs. Solid-Color JPG
                </h2>
                <p className="text-[14px] text-[#6B7280]">
                  Choose the right downloadable format based on where you plan to publish your image.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB]">
                  <div className="flex items-center gap-2 font-semibold text-[#111827] text-[15px] mb-2">
                    <span className="material-symbols-outlined text-[#4F46E5] text-[20px]">grid_view</span>
                    Transparent PNG (Recommended for Design)
                  </div>
                  <p className="text-[13px] text-[#6B7280] mb-3">
                    Preserves complete alpha transparency. Perfect when you need to remove background from image and save as PNG for:
                  </p>
                  <ul className="text-[13px] text-[#4B5563] space-y-1.5 list-disc pl-5">
                    <li>Layering in Canva, Figma, Photoshop, or video overlays</li>
                    <li>Website product catalog icons and transparent logos</li>
                    <li>Collages, stickers, and custom presentation slides</li>
                    <li>Exported as 32-bit RGBA without background compression artifacts</li>
                  </ul>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB]">
                  <div className="flex items-center gap-2 font-semibold text-[#111827] text-[15px] mb-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[20px]">palette</span>
                    Solid-Color JPG (Recommended for Web &amp; Profiles)
                  </div>
                  <p className="text-[13px] text-[#6B7280] mb-3">
                    Composites your subject on a clean studio solid color. Ideal for:
                  </p>
                  <ul className="text-[13px] text-[#4B5563] space-y-1.5 list-disc pl-5">
                    <li>Pure white backgrounds (#FFFFFF) for e-commerce marketplaces</li>
                    <li>Professional neutral gray or navy headshots for LinkedIn &amp; resumes</li>
                    <li>Smaller file sizes for fast web loading and social avatar uploads</li>
                    <li>Exported as standard 24-bit RGB JPEG</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Honest Edge Quality & Processing Limitations */}
            <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E5E7EB] space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#4F46E5]">report_problem</span>
                <h2 className="text-[19px] font-headline font-bold text-[#111827]">
                  Technical Scope &amp; Edge Limitations
                </h2>
              </div>
              <p className="text-[14px] text-[#4B5563] leading-relaxed">
                ColorCut operates completely within your browser using open-source machine learning. To ensure transparent expectations before editing:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] text-[#4B5563]">
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-2">
                  <div className="font-semibold text-[#111827]">Edge Separation Characteristics</div>
                  <p className="text-[#6B7280] leading-relaxed">
                    The model excels with portraits, products, and distinct silhouettes. However, subjects with low contrast against the background (e.g., dark hair on black shadows or white shirts on white walls) or sheer, semi-transparent textiles may exhibit slight edge softness.
                  </p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-2">
                  <div className="font-semibold text-[#111827]">Hardware &amp; Model Weights Download</div>
                  <p className="text-[#6B7280] leading-relaxed">
                    Because inference runs locally via WebAssembly, your computer or mobile CPU/RAM handles the computation. The initial run requires downloading model weights (~20–40 MB), which are cached in your browser. ColorCut does not provide batch editing or video processing.
                  </p>
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

            {/* Questions & Technical Answers (AEO) */}
            <div className="pt-8 border-t border-[#E5E7EB] space-y-6">
              <div>
                <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-1">
                  Frequently Asked Questions &amp; Direct Answers
                </h2>
                <p className="text-[14px] text-[#6B7280]">
                  Direct, concise answers to common questions about ColorCut&apos;s workflow, capabilities, and system specifications.
                </p>
              </div>

              <div className="space-y-4 text-[14px]">
                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    How do I remove a background from an image online?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    Upload any JPG, PNG, or WebP photo up to 10 MB to ColorCut. The browser-based AI model automatically detects your foreground subject, removes the backdrop in seconds, and displays your transparent cutout without uploading your photo to any server.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Can I make an image background transparent and save it as a PNG?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    Yes. Once the background is removed, ColorCut creates a full 32-bit alpha transparency channel. Click &quot;Download PNG&quot; to export a lossless transparent cutout ready for Canva, Figma, Photoshop, or web design.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Can I change a photo background to pure white or another solid color?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    Yes. After background removal, select pure white (<code className="text-[#4F46E5] font-mono">#FFFFFF</code>) or choose from 17 curated solid color presets or custom HEX values. The solid color is composited directly behind your isolated subject and exported as a high-quality JPG.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Which image formats and file sizes are supported?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    ColorCut supports JPG, JPEG, PNG, and WebP input images up to 10 MB. Output downloads are provided at 100% original pixel resolution with zero watermarks as transparent PNG or solid-color JPG files.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Why can the first processing run take longer?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    On your initial visit, your browser downloads the machine-learning model weights (~20–40 MB) from our CDN. Once stored in your browser cache, subsequent edits on the same device execute much faster because the model is already available locally.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Why can hair, fur, or low-contrast edges look soft?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    Fine stray hairs and low-contrast borders (such as dark hair against dark shadows or white clothing against light walls) share pixel luminance with the background. While ColorCut isolates fine contours, high-contrast photos with distinct lighting produce the sharpest cutout edges.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Can ColorCut generate a new background scene or replace backgrounds with photos?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    No. ColorCut focuses strictly on precision background removal and solid-color replacement. It does not generate synthetic AI scenes, photo-realistic landscapes, or inpaint replacement images.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Can ColorCut process multiple images at once (batch editing)?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    No. ColorCut processes one image at a time with full interactive preview and color control. Batch editing and bulk queue uploads are not supported.
                  </p>
                </div>
              </div>
            </div>

            {/* In-Depth Step-by-Step Guides */}
            <div className="pt-8 border-t border-[#E5E7EB]">
              <h2 className="text-[17px] font-headline font-semibold text-[#111827] mb-1">
                Step-by-Step Practical Guides
              </h2>
              <p className="text-[13px] text-[#6B7280] mb-4">
                Explore comprehensive tutorials for specific design, e-commerce, and creative workflows:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="/how-to-make-a-background-transparent"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">Transparent PNG Guide</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">Alpha channels, PNG vs JPG, and cutouts</span>
                </a>
                <a
                  href="/white-background-for-product-photos"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">White Background for Products</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">Pure #FFFFFF for Amazon, eBay, Shopify</span>
                </a>
                <a
                  href="/change-photo-background-color"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">Change Background Color</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">17 presets &amp; custom HEX picker guide</span>
                </a>
              </div>
            </div>

            {/* Related Pages */}
            <div className="pt-6 border-t border-[#E5E7EB]">
              <h2 className="text-[17px] font-headline font-semibold text-[#111827] mb-3">
                Related Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="/about"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">About ColorCut</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">In-browser architecture &amp; mission</span>
                </a>
                <a
                  href="/privacy"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">Privacy Policy</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">Local processing &amp; zero tracking</span>
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
                  Ready to remove an image background?
                </h3>
                <p className="text-[13px] text-[#6B7280] mt-0.5">
                  Upload an image now or test with sample photos on the homepage tool.
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
                <span>Open Tool &amp; Upload</span>
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
