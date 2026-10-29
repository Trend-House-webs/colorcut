import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LegalModal, LegalDocType } from '../components/LegalPages';

interface AboutPageProps {
  onNavigateHome: () => void;
  onTriggerUpload: () => void;
  onOpenHelpModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
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

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header
        currentView="about"
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
              <span className="text-[#111827] font-medium">About</span>
            </nav>

            <span className="text-[12px] font-semibold text-[#4F46E5] uppercase tracking-wider">
              Architecture &amp; Mission
            </span>
            <h1 className="text-[32px] sm:text-[42px] font-headline font-bold text-[#111827] mt-1.5 tracking-tight">
              About ColorCut
            </h1>
            <p className="text-[16px] text-[#6B7280] mt-3 leading-relaxed">
              ColorCut is a modern web application designed for instant, high-fidelity image background removal and studio solid-color replacement, executed entirely inside client browser memory.
            </p>
            <div className="mt-4 flex items-center gap-3 text-[12px] text-[#6B7280]">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]"></span>
                WebAssembly &amp; Canvas Architecture
              </span>
              <span>•</span>
              <span>100% Free &amp; Private</span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 space-y-10 text-[15px] text-[#374151] leading-relaxed">
            
            {/* Overview / Mission */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-3">
                Why ColorCut Exists
              </h2>
              <p className="mb-3">
                Most web-based background removal tools require expensive monthly subscriptions, lock full-resolution downloads behind paywalls, place intrusive watermarks across your photos, or require uploading private images to remote servers for processing.
              </p>
              <p>
                ColorCut was built on a different engineering philosophy: leveraging modern browser capabilities—specifically WebAssembly (Wasm) and HTML5 Canvas—to bring neural network image segmentation directly onto the user&apos;s device.
              </p>
            </div>

            {/* Technical Pipeline */}
            <div className="bg-[#F9FAFB] p-6 sm:p-8 rounded-2xl border border-[#E5E7EB]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-[#4F46E5]">
                  <span className="material-symbols-outlined text-[22px]">memory</span>
                </div>
                <div>
                  <h2 className="font-headline font-bold text-[18px] text-[#111827]">
                    The Technical Pipeline
                  </h2>
                  <p className="text-[12px] text-[#6B7280]">
                    From upload to pixel-accurate cutout in 4 discrete stages
                  </p>
                </div>
              </div>

              <div className="space-y-4 font-mono text-[13px] text-[#1F2937]">
                <div className="p-3 bg-white rounded-xl border border-[#E5E7EB]">
                  <span className="text-[#4F46E5] font-bold">1. Input Ingestion:</span> Standard HTML5 file reading. Supports JPG, PNG, and WebP up to 10MB in browser RAM.
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E5E7EB]">
                  <span className="text-[#4F46E5] font-bold">2. Neural Segmentation:</span> ONNX Runtime executes the <code className="text-[#059669]">isnet_fp16</code> machine-learning model via SIMD-accelerated WebAssembly (<code className="text-[#059669]">ort-wasm-simd-threaded.jsep.wasm</code>).
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E5E7EB]">
                  <span className="text-[#4F46E5] font-bold">3. Canvas Compositing:</span> Real-time 2D canvas alpha blending composites either transparent transparency checks or any of 17 curated solid color presets or custom HEX values.
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E5E7EB]">
                  <span className="text-[#4F46E5] font-bold">4. Zero-Watermark Export:</span> Direct client export to 32-bit transparent PNG (with alpha channel) or 24-bit high-quality solid JPG at full original source resolution.
                </div>
              </div>
            </div>

            {/* Client-Side Capabilities and Constraints */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-3">
                Client-Side Capabilities &amp; System Realities
              </h2>
              <p className="mb-3">
                To maintain transparency with our users, here is what you need to know about how ColorCut operates:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#4B5563]">
                <li><strong>No Cloud GPU Farm:</strong> Processing runs directly on your CPU or GPU using your device&apos;s available hardware resources. Performance scales with your hardware.</li>
                <li><strong>Initial Asset Caching:</strong> On your first run, the browser downloads the neural network model weights (~20-40 MB). Once downloaded, modern browsers cache these assets, making subsequent edits significantly faster.</li>
                <li><strong>Zero Telemetry &amp; No Database:</strong> There is no backend server collecting user emails, usage metrics, or uploaded photos.</li>
                <li><strong>Static Edge Hosting:</strong> ColorCut is served as static HTML, CSS, and JavaScript from Cloudflare Workers edge nodes (<code className="px-1.5 py-0.5 rounded bg-gray-100 text-[13px] font-mono">https://color.cutfree.workers.dev</code>).</li>
              </ul>
            </div>

            {/* Open-Source Attribution */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-3">
                Open-Source Technology
              </h2>
              <p className="mb-3">
                ColorCut is built with modern web technologies:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#4B5563]">
                <li><strong>React 19 &amp; Vite:</strong> For fast client-side rendering and static build prerendering.</li>
                <li><strong>@imgly/background-removal:</strong> Open-source client-side background removal library licensed under AGPLv3.</li>
                <li><strong>Tailwind CSS:</strong> For clean, responsive typography and accessible user interfaces.</li>
                <li><strong>ONNX Runtime Web:</strong> For executing neural inference in the browser sandbox.</li>
              </ul>
            </div>

            {/* Technical Answers & FAQ (AEO) */}
            <div className="pt-8 border-t border-[#E5E7EB] space-y-6">
              <div>
                <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-1">
                  Architecture &amp; Privacy Questions
                </h2>
                <p className="text-[14px] text-[#6B7280]">
                  Clear, verified answers about how ColorCut runs and how user data is protected.
                </p>
              </div>

              <div className="space-y-4 text-[14px]">
                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Are images processed in the browser?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    Yes. All image decoding, neural network segmentation (via ONNX Runtime Web and WebAssembly), and canvas color rendering execute entirely within your local browser memory.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Are images uploaded to any remote server or database?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    No. Your photos are never uploaded to, sent to, or stored on any server, backend worker, or database. Your image data exists solely in transient browser RAM during your active session.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    What network requests actually leave the device?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    When you load ColorCut, your browser downloads standard static website assets (HTML, CSS, JS) and the open-source neural model weight files (~20–40 MB) from our static CDN. No user photos, personal identity markers, or telemetry are ever transmitted.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[15px]">
                    Does ColorCut require an account or subscription?
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed">
                    No. ColorCut requires no account registration, login credentials, or email address. All features—including transparent PNG and solid-color JPG downloads at full original resolution—are 100% free with zero watermarks.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Links */}
            <div className="pt-8 border-t border-[#E5E7EB]">
              <h2 className="text-[17px] font-headline font-semibold text-[#111827] mb-3">
                Explore ColorCut
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="/how-it-works"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">How It Works</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">Step-by-step usage guide</span>
                </a>
                <a
                  href="/privacy"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">Privacy Policy</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">In-browser data isolation</span>
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
                  Experience ColorCut in action
                </h3>
                <p className="text-[13px] text-[#6B7280] mt-0.5">
                  Isolate portrait subjects or product shots in seconds.
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
