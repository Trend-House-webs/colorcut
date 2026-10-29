import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LegalModal, LegalDocType } from '../components/LegalPages';

interface TransparentPngGuidePageProps {
  onNavigateHome: () => void;
  onTriggerUpload: () => void;
  onOpenHelpModal: () => void;
}

export const TransparentPngGuidePage: React.FC<TransparentPngGuidePageProps> = ({
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
      title: 'Upload Your Photo to ColorCut',
      description:
        'Select any JPG, PNG, or WebP image up to 10 MB. Your file is read directly into local browser memory without uploading to an external server. You can also test immediately using our sample product and portrait photos.',
    },
    {
      num: '02',
      title: 'Automatic Neural Background Segmentation',
      description:
        'The in-browser AI model (isnet_fp16) identifies foreground boundaries using WebAssembly. It isolates the subject and converts the surrounding background into a 32-bit alpha transparency channel with sub-pixel edge precision.',
    },
    {
      num: '03',
      title: 'Inspect the Cutout on the Checkerboard Grid',
      description:
        'Examine the transparent preview against an industry-standard checkerboard pattern. Confirm that fine hair, product edges, and contours are clearly separated without leftover background fragments.',
    },
    {
      num: '04',
      title: 'Export Lossless Transparent PNG',
      description:
        'Click "Download PNG". ColorCut exports a full-resolution 32-bit RGBA PNG file preserving complete alpha transparency. The output file has zero watermarks and is immediately ready for Canva, Figma, Photoshop, or web design.',
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header
        currentView="transparent-png-guide"
        onNavigateHome={onNavigateHome}
        onTriggerUpload={onTriggerUpload}
        onOpenHelpModal={onOpenHelpModal}
      />

      <main className="flex-1">
        {/* Hero Section */}
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
              <span className="text-[#111827] font-medium">Transparent PNG Guide</span>
            </nav>

            <span className="text-[12px] font-semibold text-[#4F46E5] uppercase tracking-wider">
              Transparency &amp; Export Tutorial
            </span>
            <h1 className="text-[32px] sm:text-[42px] font-headline font-bold text-[#111827] mt-1.5 tracking-tight">
              How to Make an Image Background Transparent
            </h1>
            <p className="text-[16px] text-[#6B7280] mt-3 leading-relaxed max-w-3xl">
              Learn how to remove background from image and make it transparent online without Photoshop. Export clean, full-resolution 32-bit transparent PNG files directly in your web browser with zero watermarks.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-[#6B7280]">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]"></span>
                Transparent PNG Maker
              </span>
              <span>•</span>
              <span>32-bit Alpha Channel • Free &amp; In-Browser</span>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 space-y-12">
            
            {/* Direct Answer / Quick Summary */}
            <div className="p-6 sm:p-8 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB]">
              <h2 className="text-[20px] font-headline font-bold text-[#111827] mb-2">
                Quick Summary: Making an Image Background Transparent
              </h2>
              <p className="text-[15px] text-[#4B5563] leading-relaxed mb-4">
                To make an image background transparent using ColorCut:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-[14px] text-[#374151]">
                <li><strong>Select your photo:</strong> Open ColorCut and upload any JPG, PNG, or WebP image (up to 10 MB).</li>
                <li><strong>Automatic neural removal:</strong> ColorCut isolates the subject locally in browser memory via WebAssembly.</li>
                <li><strong>Inspect transparency:</strong> Verify the edge contours against the checkerboard transparency grid.</li>
                <li><strong>Download PNG:</strong> Click "Download PNG" to save a 32-bit transparent PNG. Do not save as JPG if transparency is required.</li>
              </ol>
            </div>

            {/* What is a transparent background */}
            <div className="space-y-4">
              <h2 className="text-[22px] sm:text-[26px] font-headline font-bold text-[#111827]">
                What is a Transparent Background and How Does It Work?
              </h2>
              <p className="text-[15px] text-[#4B5563] leading-relaxed">
                A digital image is composed of color channels. Standard photos contain three color channels: Red, Green, and Blue (24-bit RGB). When an image has a <strong>transparent background</strong>, a fourth channel called the <strong>alpha channel</strong> (32-bit RGBA) is added.
              </p>
              <p className="text-[15px] text-[#4B5563] leading-relaxed">
                The alpha channel controls opacity for every individual pixel on a scale from 0 to 255:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                  <div className="font-semibold text-[#111827] text-[14px] mb-1">Alpha = 0 (Transparent)</div>
                  <p className="text-[13px] text-[#6B7280]">Pixels where the background was removed. Any surface beneath the image shows through completely.</p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                  <div className="font-semibold text-[#111827] text-[14px] mb-1">Alpha = 1 to 254 (Sub-pixel)</div>
                  <p className="text-[13px] text-[#6B7280]">Semi-transparent edge pixels that blend soft hair, fur, and delicate contours smoothly onto any new backdrop.</p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                  <div className="font-semibold text-[#111827] text-[14px] mb-1">Alpha = 255 (Opaque)</div>
                  <p className="text-[13px] text-[#6B7280]">The foreground subject itself, rendered with full original color, contrast, and clarity.</p>
                </div>
              </div>
            </div>

            {/* Why JPG cannot have transparent background */}
            <div className="p-6 sm:p-8 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-amber-700">warning</span>
                <h2 className="text-[19px] font-headline font-bold text-amber-900">
                  Why JPG Files Cannot Preserve a Transparent Background
                </h2>
              </div>
              <p className="text-[14px] text-amber-950 leading-relaxed">
                A frequent mistake when trying to save an image with a transparent background is exporting in <strong>JPG (JPEG)</strong> format. The JPEG specification only supports 24-bit RGB color and does not define an alpha transparency channel.
              </p>
              <p className="text-[14px] text-amber-950 leading-relaxed">
                If an image with transparency is converted to JPG, the browser or photo software must fill the missing alpha pixels with a solid color (typically solid white or black). To preserve transparent backgrounds for logos, product graphics, or Canva overlays, <strong>always download as PNG</strong>.
              </p>
            </div>

            {/* Step-by-Step Workflow in ColorCut */}
            <div className="space-y-6">
              <h2 className="text-[22px] sm:text-[26px] font-headline font-bold text-[#111827]">
                Step-by-Step: Creating a Transparent PNG in ColorCut
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

            {/* Common Mistakes to Avoid */}
            <div className="space-y-4">
              <h2 className="text-[22px] sm:text-[26px] font-headline font-bold text-[#111827]">
                Common Transparency &amp; Export Mistakes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <div className="font-semibold text-rose-700 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                    Taking a Screenshot of the Preview
                  </div>
                  <p className="text-[#6B7280] leading-relaxed">
                    Taking a screenshot captures the gray and white checkerboard squares as literal pixels. Always use the "Download PNG" button to receive true alpha data.
                  </p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <div className="font-semibold text-rose-700 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                    Lossy Compressor Compression
                  </div>
                  <p className="text-[#6B7280] leading-relaxed">
                    Passing a transparent PNG through generic image compressors configured for JPEG output strips the alpha channel, turning your background solid white.
                  </p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <div className="font-semibold text-rose-700 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                    Low-Contrast Source Photos
                  </div>
                  <p className="text-[#6B7280] leading-relaxed">
                    Photos where subject color matches background tone closely (e.g. black coat on dark shadow) can cause AI models to misidentify edges. Use well-lit photos when possible.
                  </p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <div className="font-semibold text-rose-700 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                    Expecting Animated or Video Cutouts
                  </div>
                  <p className="text-[#6B7280] leading-relaxed">
                    ColorCut is designed for still photos (JPG, PNG, WebP). It does not support animated GIFs, APNG sequences, or video frame background removal.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Specifications & First Run Note */}
            <div className="p-6 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-3">
              <h3 className="font-headline font-semibold text-[17px] text-[#111827]">
                Supported Formats and In-Browser Specifications
              </h3>
              <ul className="text-[13px] text-[#4B5563] space-y-1.5 list-disc pl-5">
                <li><strong>Supported Inputs:</strong> JPG, JPEG, PNG, and WebP images up to 10 MB.</li>
                <li><strong>In-Browser Execution:</strong> Segmentation runs locally via ONNX Runtime &amp; WebAssembly; no photos are uploaded to external servers.</li>
                <li><strong>First-Run Loading:</strong> The browser downloads neural model weights (~20–40 MB) from CDN on your first use. Subsequent runs use cached local weights and execute significantly faster.</li>
                <li><strong>Export Output:</strong> Full original resolution 32-bit RGBA PNG with zero watermarks.</li>
              </ul>
            </div>

            {/* Questions & Direct Answers (AEO) */}
            <div className="pt-8 border-t border-[#E5E7EB] space-y-6">
              <div>
                <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-1">
                  Frequently Asked Questions About Transparent PNGs
                </h2>
                <p className="text-[14px] text-[#6B7280]">
                  Direct answers to common questions about creating, inspecting, and using transparent image backgrounds.
                </p>
              </div>

              <div className="space-y-4 text-[14px]">
                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Can I make an image background transparent online without Photoshop?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    Yes. ColorCut runs an advanced neural segmentation model entirely in your web browser. You can upload any photo, remove the background automatically without Photoshop, and download a transparent PNG file for free.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    How do I download an image with a transparent background?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    Once ColorCut processes your photo, keep the background setting as &quot;Transparent&quot; and click the &quot;Download PNG&quot; button. Your file is saved as a 32-bit RGBA PNG file that preserves true alpha transparency.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Why does JPG not preserve transparency?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    The JPEG image specification does not support an alpha channel; it only encodes 24-bit red, green, and blue color channels. Saving a transparent cutout as a JPG fills all transparent pixels with solid white or black. Always use PNG to keep the background transparent.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    How do I verify that my downloaded PNG is truly transparent?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    Open your downloaded PNG in an application that supports layers (such as Canva, Figma, Photoshop, or Google Slides) and place a colored rectangle behind it. If the rectangle is visible around your subject without a white or black box, your PNG is fully transparent.
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
                  href="/change-photo-background-color"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">Change Photo Background Color</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">Solid color replacement guide</span>
                </a>
                <a
                  href="/how-it-works"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">How ColorCut Works</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">Step-by-step workflow guide</span>
                </a>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-headline font-semibold text-[18px] text-[#111827]">
                  Make an image background transparent now
                </h3>
                <p className="text-[13px] text-[#6B7280] mt-0.5">
                  Upload your photo to ColorCut. Free, instant, and runs directly in your browser.
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
                <span>Open Transparent PNG Tool</span>
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
