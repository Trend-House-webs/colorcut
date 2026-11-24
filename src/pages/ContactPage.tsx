import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LegalModal, LegalDocType } from '../components/LegalPages';
import { CONFIG } from '../config';

interface ContactPageProps {
  onNavigateHome: () => void;
  onTriggerUpload: () => void;
  onOpenHelpModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  onTriggerUpload,
  onOpenHelpModal,
}) => {
  const [legalModalOpen, setLegalModalOpen] = React.useState(false);
  const [legalDoc, setLegalDoc] = React.useState<LegalDocType>('feedback');

  const handleOpenLegal = (doc: LegalDocType) => {
    setLegalDoc(doc);
    setLegalModalOpen(true);
  };

  const hasConfiguredEmail = Boolean(CONFIG.CONTACT_EMAIL && CONFIG.CONTACT_EMAIL.trim().length > 0);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header
        currentView="contact"
        onNavigateHome={onNavigateHome}
        onTriggerUpload={onTriggerUpload}
        onOpenHelpModal={onOpenHelpModal}
      />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-[#F9FAFB] border-b border-[#E5E7EB] py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-[#6B7280] mb-4">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                }}
                className="hover:text-[#4F46E5] transition-colors"
              >
                Home
              </a>
              <span>/</span>
              <span className="text-[#111827] font-medium">Contact</span>
            </nav>

            <span className="text-[12px] font-semibold text-[#4F46E5] uppercase tracking-wider">
              Support &amp; Inquiries
            </span>
            <h1 className="text-[32px] sm:text-[42px] font-headline font-bold text-[#111827] mt-1.5 tracking-tight">
              Contact Us
            </h1>
            <p className="text-[16px] text-[#6B7280] mt-3 leading-relaxed">
              Have a question about CutColor&apos;s client-side background remover, need technical assistance, or want to report a browser compatibility issue? Find our support details and troubleshooting resources below.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-[#6B7280]">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]"></span>
                CutColor Support &amp; Feedback
              </span>
              <span>•</span>
              <span>100% Client-Side Web Application</span>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 space-y-10 text-[15px] text-[#374151] leading-relaxed">
            {/* How to Contact the Website Owner */}
            <div className="space-y-4">
              <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827]">
                How to Contact the CutColor Team
              </h2>
              <p>
                CutColor (<code className="px-1.5 py-0.5 rounded bg-gray-100 text-[13px] font-mono">{CONFIG.SITE_ORIGIN}</code>) is maintained as a static, privacy-first web application that processes images locally in your browser without a remote database or user account system.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {/* Direct Email Channel / Owner Configuration Point */}
                <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#4F46E5]">
                      <span className="material-symbols-outlined text-[22px]">mail</span>
                    </div>
                    <h3 className="font-headline font-bold text-[17px] text-[#111827]">
                      Direct Owner Contact
                    </h3>
                    {hasConfiguredEmail ? (
                      <p className="text-[14px] text-[#4B5563]">
                        For general inquiries, feedback, or site administration questions, you can email the website owner directly:
                      </p>
                    ) : (
                      <p className="text-[14px] text-[#4B5563]">
                        A direct support email address has not been published yet. The site owner can configure an active contact email in <code className="px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB] text-[12px] font-mono">src/config.ts</code> (<code className="px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB] text-[12px] font-mono">CONFIG.CONTACT_EMAIL</code>).
                      </p>
                    )}
                  </div>

                  {hasConfiguredEmail ? (
                    <a
                      href={`mailto:${CONFIG.CONTACT_EMAIL}`}
                      className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#4F46E5] hover:underline"
                    >
                      <span>{CONFIG.CONTACT_EMAIL}</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                  ) : (
                    <div className="p-3 rounded-xl bg-white border border-[#E5E7EB] text-[12px] text-[#6B7280] font-mono">
                      Owner configuration key: CONFIG.CONTACT_EMAIL
                    </div>
                  )}
                </div>

                {/* Official Repository Channel */}
                <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#4F46E5]">
                      <span className="material-symbols-outlined text-[22px]">code</span>
                    </div>
                    <h3 className="font-headline font-bold text-[17px] text-[#111827]">
                      Technical Issues &amp; Bug Reports
                    </h3>
                    <p className="text-[14px] text-[#4B5563]">
                      To report a bug, WebAssembly browser compatibility issue, or feature suggestion, you can open an issue on the project&apos;s public GitHub repository.
                    </p>
                  </div>

                  <a
                    href={`${CONFIG.GITHUB_REPO_URL}/issues`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#4F46E5] hover:underline"
                  >
                    <span>GitHub Repository Issue Tracker</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Support & Feedback Explanation */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[22px] text-[#4F46E5]">support_agent</span>
                <h2 className="text-[19px] sm:text-[21px] font-headline font-bold text-[#111827]">
                  How Support &amp; Privacy Inquiries Work
                </h2>
              </div>
              <p className="text-[14px] text-[#4B5563] leading-relaxed">
                Because CutColor executes all image background removal and canvas color replacement strictly inside your own web browser via WebAssembly:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[14px] text-[#4B5563]">
                <li>
                  <strong>We cannot access your uploaded photos:</strong> Your images are never transmitted to our servers. If you encounter an edge-quality issue with a specific photo, we never see the file unless you explicitly choose to share a screenshot or description when reporting a bug.
                </li>
                <li>
                  <strong>No account or billing support needed:</strong> CutColor is 100% free with no user accounts, subscriptions, or stored payment data.
                </li>
                <li>
                  <strong>Helpful details for bug reports:</strong> When reporting a technical problem, please include your browser name and version (e.g., Chrome, Safari, Firefox, Edge), operating system, the file format (JPG, PNG, or WebP), and approximate image resolution.
                </li>
              </ul>
            </div>

            {/* Quick Troubleshooting Before You Contact Us */}
            <div className="space-y-4">
              <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827]">
                Common Support Questions &amp; Quick Fixes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                <div className="p-5 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[14px]">
                    First-time processing takes 10–20 seconds
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    On your first visit, your browser downloads the neural model weights (~20–40 MB) from our CDN and caches them locally. Subsequent images process much faster.
                  </p>
                </div>
                <div className="p-5 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[14px]">
                    Downloaded file has a white background instead of transparent
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Make sure the background preset is set to <strong>Transparent</strong> and click <strong>Download PNG</strong>. Standard JPG files do not support alpha transparency.
                  </p>
                </div>
                <div className="p-5 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[14px]">
                    File upload rejected
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    CutColor accepts standard JPG, JPEG, PNG, and WebP files up to 10 MB. If your photo exceeds 10 MB, resize or compress it slightly before uploading.
                  </p>
                </div>
                <div className="p-5 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1.5">
                  <h3 className="font-semibold text-[#111827] text-[14px]">
                    Custom HEX color code not applying
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Enter any valid 6-character HEX code (e.g., <code className="font-mono text-[#4F46E5]">#2563EB</code>) or 3-character shorthand in the Custom Color box in the editor sidebar.
                  </p>
                </div>
              </div>
            </div>

            {/* Links to Relevant Pages & Guides */}
            <div className="pt-8 border-t border-[#E5E7EB] space-y-6">
              <div>
                <h2 className="text-[18px] font-headline font-bold text-[#111827] mb-3">
                  Helpful Pages &amp; Guides
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px]">
                  <a
                    href="/how-it-works"
                    className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                  >
                    <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">How It Works</span>
                    <span className="text-[12px] text-[#6B7280] mt-1">Step-by-step workflow overview</span>
                  </a>
                  <a
                    href="/about"
                    className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                  >
                    <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">About CutColor</span>
                    <span className="text-[12px] text-[#6B7280] mt-1">In-browser architecture &amp; specs</span>
                  </a>
                  <a
                    href="/privacy"
                    className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                  >
                    <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">Privacy Policy</span>
                    <span className="text-[12px] text-[#6B7280] mt-1">Local processing &amp; data protection</span>
                  </a>
                  <a
                    href="/terms"
                    className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                  >
                    <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">Terms of Use</span>
                    <span className="text-[12px] text-[#6B7280] mt-1">Commercial &amp; personal usage rights</span>
                  </a>
                  <a
                    href="/how-to-make-a-background-transparent"
                    className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                  >
                    <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">Transparent PNG Guide</span>
                    <span className="text-[12px] text-[#6B7280] mt-1">Export 32-bit alpha cutouts</span>
                  </a>
                  <a
                    href="/white-background-for-product-photos"
                    className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                  >
                    <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">White Background Guide</span>
                    <span className="text-[12px] text-[#6B7280] mt-1">Pure #FFFFFF product photos</span>
                  </a>
                </div>
              </div>

              {/* Return to Homepage Tool CTA */}
              <div className="p-6 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-headline font-semibold text-[17px] text-[#111827]">
                    Return to the CutColor Background Remover
                  </h3>
                  <p className="text-[13px] text-[#6B7280] mt-0.5">
                    Remove image backgrounds and change solid background colors online for free.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateHome();
                    }}
                    className="px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#F3F4F6] text-[#111827] text-[13px] font-semibold transition-colors"
                  >
                    Back to Home
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigateHome();
                      setTimeout(() => onTriggerUpload(), 100);
                    }}
                    className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                    <span>Upload Image</span>
                  </button>
                </div>
              </div>
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
