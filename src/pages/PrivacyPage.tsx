import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LegalModal, LegalDocType } from '../components/LegalPages';

interface PrivacyPageProps {
  onNavigateHome: () => void;
  onTriggerUpload: () => void;
  onOpenHelpModal: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({
  onNavigateHome,
  onTriggerUpload,
  onOpenHelpModal,
}) => {
  const [legalModalOpen, setLegalModalOpen] = React.useState(false);
  const [legalDoc, setLegalDoc] = React.useState<LegalDocType>('privacy');

  const handleOpenLegal = (doc: LegalDocType) => {
    setLegalDoc(doc);
    setLegalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header
        currentView="privacy"
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
              <span className="text-[#111827] font-medium">Privacy Policy</span>
            </nav>

            <span className="text-[12px] font-semibold text-[#4F46E5] uppercase tracking-wider">
              Transparency &amp; Data Protection
            </span>
            <h1 className="text-[32px] sm:text-[42px] font-headline font-bold text-[#111827] mt-1.5 tracking-tight">
              ColorCut Privacy Policy
            </h1>
            <p className="text-[16px] text-[#6B7280] mt-3 leading-relaxed">
              ColorCut processes images locally in your browser memory via WebAssembly. Your photos are never sent to or stored on our servers.
            </p>
            <div className="mt-4 flex items-center gap-3 text-[12px] text-[#6B7280]">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                In-Memory Client Processing
              </span>
              <span>•</span>
              <span>Effective: October 2026</span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 space-y-10 text-[15px] text-[#374151] leading-relaxed">
            
            {/* Core Principle Callout */}
            <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-950 flex items-start gap-4">
              <span className="material-symbols-outlined text-[26px] text-emerald-600 shrink-0 mt-0.5">
                verified_user
              </span>
              <div>
                <h2 className="font-headline font-bold text-[17px] text-emerald-950 mb-1">
                  100% Client-Side Architecture
                </h2>
                <p className="text-[14px] text-emerald-900 leading-relaxed">
                  When you edit an image with ColorCut, your file is read into your browser&apos;s volatile RAM using HTML5 Canvas and WebAssembly. It is processed directly by an in-browser ONNX machine learning model. At no stage is your photo uploaded to a backend, cloud worker, or remote database.
                </p>
              </div>
            </div>

            {/* Section 1: Local Image Processing */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-3">
                1. Local Image Processing &amp; Memory Lifecycle
              </h2>
              <p className="mb-3">
                ColorCut operates as a static client-side single-page application. When you select or drag and drop a photo (JPG, PNG, or WebP up to 10MB):
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#4B5563]">
                <li>The image file is loaded strictly into browser memory using standard JavaScript APIs (<code className="px-1.5 py-0.5 rounded bg-gray-100 text-[13px] font-mono">FileReader</code> and <code className="px-1.5 py-0.5 rounded bg-gray-100 text-[13px] font-mono">HTMLCanvasElement</code>).</li>
                <li>Temporary references (<code className="px-1.5 py-0.5 rounded bg-gray-100 text-[13px] font-mono">blob:</code> URLs) exist only within your active browser tab.</li>
                <li>When you choose a new image, navigate away, or close your browser tab, all temporary object URLs are revoked and your memory is reclaimed.</li>
              </ul>
            </div>

            {/* Section 2: AI Model Weights and CDN Assets */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-3">
                2. Neural Network Model Assets &amp; CDN Downloads
              </h2>
              <p className="mb-3">
                To isolate subjects with hair and edge precision without a server-side GPU farm, ColorCut loads the open-source <code className="px-1.5 py-0.5 rounded bg-gray-100 text-[13px] font-mono">isnet_fp16</code> neural network segmentation model via the <code className="px-1.5 py-0.5 rounded bg-gray-100 text-[13px] font-mono">@imgly/background-removal</code> engine.
              </p>
              <p className="mb-3">
                On initial use, your browser downloads static WebAssembly binaries (<code className="px-1.5 py-0.5 rounded bg-gray-100 text-[13px] font-mono">ort-wasm-simd-threaded.jsep.wasm</code>) and model weights from verified static asset CDNs (<code className="px-1.5 py-0.5 rounded bg-gray-100 text-[13px] font-mono">https://staticimgly.com</code> or our edge proxy <code className="px-1.5 py-0.5 rounded bg-gray-100 text-[13px] font-mono">/imgly-data/*</code>).
              </p>
              <p>
                These static asset requests only download publicly available binary code. <strong>Your personal photos and data are never included in or transmitted with these requests.</strong>
              </p>
            </div>

            {/* Section 3: Data Collection and Cookies */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-3">
                3. Zero Tracking Cookies, User Accounts, or Analytics
              </h2>
              <p className="mb-3">
                We respect your personal privacy:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#4B5563]">
                <li><strong>No User Accounts:</strong> You do not need to register, enter an email address, or provide credentials.</li>
                <li><strong>No Advertising or Tracking Cookies:</strong> ColorCut does not set third-party marketing cookies, user profiling beacons, or cross-site tracking tags.</li>
                <li><strong>No Telemetry Storage:</strong> Image processing runs completely offline once the static model assets are cached by your browser.</li>
              </ul>
            </div>

            {/* Section 4: Feedback and Client-Side Notices */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-3">
                4. Feedback Submissions
              </h2>
              <p>
                ColorCut includes an optional feedback form designed for rating cutout quality. Because ColorCut is hosted as a serverless static website without a persistent remote backend or database, any feedback submitted in the feedback modal is handled in local browser memory only and is not transmitted to or stored on a remote server.
              </p>
            </div>

            {/* Section 5: Security & Third-Party Dependencies */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-3">
                5. Third-Party Code &amp; Hosting
              </h2>
              <p className="mb-3">
                ColorCut is statically served via Cloudflare Workers and Pages edge infrastructure (<code className="px-1.5 py-0.5 rounded bg-gray-100 text-[13px] font-mono">https://color.cutfree.workers.dev</code>) and enforced over HTTPS.
              </p>
              <p>
                All machine-learning segmentation dependencies are open-source and run within standard browser security sandbox boundaries.
              </p>
            </div>

            {/* Section 6: Related Internal Links */}
            <div className="pt-8 border-t border-[#E5E7EB]">
              <h2 className="text-[17px] font-headline font-semibold text-[#111827] mb-3">
                Related Documentation
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="/terms"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">Terms of Use</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">Acceptable use &amp; licensing</span>
                </a>
                <a
                  href="/how-it-works"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">How It Works</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">3-step background removal</span>
                </a>
                <a
                  href="/about"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">About ColorCut</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">Architecture &amp; technology</span>
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
                  Try ColorCut with your own photos or curated sample portraits.
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
