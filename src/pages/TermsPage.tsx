import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LegalModal, LegalDocType } from '../components/LegalPages';

interface TermsPageProps {
  onNavigateHome: () => void;
  onTriggerUpload: () => void;
  onOpenHelpModal: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({
  onNavigateHome,
  onTriggerUpload,
  onOpenHelpModal,
}) => {
  const [legalModalOpen, setLegalModalOpen] = React.useState(false);
  const [legalDoc, setLegalDoc] = React.useState<LegalDocType>('terms');

  const handleOpenLegal = (doc: LegalDocType) => {
    setLegalDoc(doc);
    setLegalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header
        currentView="terms"
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
              <span className="text-[#111827] font-medium">Terms of Use</span>
            </nav>

            <span className="text-[12px] font-semibold text-[#4F46E5] uppercase tracking-wider">
              Legal Agreement &amp; Acceptable Use
            </span>
            <h1 className="text-[32px] sm:text-[42px] font-headline font-bold text-[#111827] mt-1.5 tracking-tight">
              ColorCut Terms of Use
            </h1>
            <p className="text-[16px] text-[#6B7280] mt-3 leading-relaxed">
              Clear, transparent rules governing your use of the ColorCut client-side background removal and image editing tool.
            </p>
            <div className="mt-4 flex items-center gap-3 text-[12px] text-[#6B7280]">
              <span className="inline-flex items-center gap-1.5 font-medium text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                Free Personal &amp; Commercial Use
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
            <div className="p-5 sm:p-6 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-indigo-950 flex items-start gap-4">
              <span className="material-symbols-outlined text-[26px] text-[#4F46E5] shrink-0 mt-0.5">
                gavel
              </span>
              <div>
                <h2 className="font-headline font-bold text-[17px] text-indigo-950 mb-1">
                  You Retain 100% Ownership of Your Content
                </h2>
                <p className="text-[14px] text-indigo-900 leading-relaxed">
                  ColorCut claims zero copyright, licensing, or intellectual property rights over any photos you upload or export. You are free to use your exported cutouts for commercial, personal, and professional projects without watermarks or royalties.
                </p>
              </div>
            </div>

            {/* Section 1: Permitted Use */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-3">
                1. Permitted Use &amp; License
              </h2>
              <p className="mb-3">
                ColorCut is provided free of charge for personal, educational, commercial, and creative use. You may use ColorCut to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#4B5563]">
                <li>Process professional portrait headshots for resumes, LinkedIn profiles, and company directories.</li>
                <li>Remove backdrops and create pure white or branded color product photos for e-commerce stores (Amazon, Shopify, Etsy, eBay).</li>
                <li>Prepare neutral document portraits and ID photos.</li>
                <li>Design social media banners, YouTube thumbnails, avatars, and graphic assets.</li>
              </ul>
            </div>

            {/* Section 2: User Responsibility */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-3">
                2. User Responsibility &amp; Content Rights
              </h2>
              <p className="mb-3">
                By uploading images to ColorCut, you represent and warrant that:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#4B5563]">
                <li>You own the intellectual property rights in the image, or have obtained explicit permission or licensing from the copyright holder to edit the content.</li>
                <li>You will not use ColorCut to process illegal, non-consensual intimate imagery, defamatory material, or content that infringes upon third-party rights.</li>
              </ul>
            </div>

            {/* Section 3: Open-Source Engine Attribution */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-3">
                3. Open-Source Component Attribution (AGPLv3)
              </h2>
              <p className="mb-3">
                The client-side neural segmentation engine in ColorCut uses <code className="px-1.5 py-0.5 rounded bg-gray-100 text-[13px] font-mono">@imgly/background-removal</code>, licensed under the GNU Affero General Public License v3 (AGPLv3).
              </p>
              <p>
                In compliance with AGPLv3, the web application source code and its client-side integration are maintained with open transparency.
              </p>
            </div>

            {/* Section 4: Performance and Hardware Disclaimer */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-3">
                4. Client-Side Processing &amp; Device Performance
              </h2>
              <p className="mb-3">
                Because segmentation runs on your device rather than a remote cloud cluster:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#4B5563]">
                <li>Processing speeds depend directly on your device CPU, available RAM, and browser WebAssembly/WebGPU capabilities.</li>
                <li>Initial asset download requires approximately 20-40 MB of network bandwidth to download model weights, which are subsequently cached locally by your browser.</li>
                <li>ColorCut recommends image files up to 10 MB in standard formats (JPG, PNG, WebP) for optimal performance.</li>
              </ul>
            </div>

            {/* Section 5: Disclaimer of Warranties */}
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-headline font-bold text-[#111827] mb-3">
                5. Disclaimer of Warranties &amp; Limitation of Liability
              </h2>
              <p className="mb-3">
                ColorCut is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, without warranty of any kind, whether express, implied, statutory, or otherwise.
              </p>
              <p>
                While the underlying AI model strives for high sub-pixel edge fidelity, cutout precision varies depending on subject contrast, motion blur, lighting conditions, and resolution. ColorCut shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the application.
              </p>
            </div>

            {/* Section 6: Related Internal Links */}
            <div className="pt-8 border-t border-[#E5E7EB]">
              <h2 className="text-[17px] font-headline font-semibold text-[#111827] mb-3">
                Related Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="/privacy"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">Privacy Policy</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">In-browser data handling</span>
                </a>
                <a
                  href="/how-it-works"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">How It Works</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">Detailed workflow guide</span>
                </a>
                <a
                  href="/about"
                  className="p-4 rounded-xl border border-[#E5E7EB] hover:border-[#4F46E5] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <span className="font-medium text-[#111827] group-hover:text-[#4F46E5]">About ColorCut</span>
                  <span className="text-[12px] text-[#6B7280] mt-1">Architecture &amp; pipeline</span>
                </a>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="p-6 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-headline font-semibold text-[17px] text-[#111827]">
                  Start editing with ColorCut
                </h3>
                <p className="text-[13px] text-[#6B7280] mt-0.5">
                  Free, instant background removal with zero sign-ups.
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
