import React, { useState } from 'react';

export type LegalDocType = 'privacy' | 'terms' | 'api' | 'feedback';

interface LegalModalProps {
  isOpen: boolean;
  initialDoc?: LegalDocType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialDoc = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalDocType>(initialDoc);
  const [feedbackCategory, setFeedbackCategory] = useState<string>('general');
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setFeedbackText('');
      onClose();
    }, 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
            <div>
              <h2
                id="legal-modal-title"
                className="font-headline font-bold text-[18px] text-[#111827]"
              >
                ColorCut Documentation &amp; Legal
              </h2>
              <p className="text-[12px] text-[#6B7280]">
                Transparency on privacy, terms, client-side processing, and licensing
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E5E7EB] px-4 sm:px-6 bg-white overflow-x-auto gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-3 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-[#4F46E5] text-[#4F46E5] font-semibold'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`py-3 px-3 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'terms'
                ? 'border-[#4F46E5] text-[#4F46E5] font-semibold'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Terms of Use
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('api')}
            className={`py-3 px-3 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'api'
                ? 'border-[#4F46E5] text-[#4F46E5] font-semibold'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Architecture &amp; API
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('feedback')}
            className={`py-3 px-3 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'feedback'
                ? 'border-[#4F46E5] text-[#4F46E5] font-semibold'
                : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Feedback
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5 text-[14px] text-[#4B5563] leading-relaxed">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[20px] text-emerald-600 shrink-0">
                  security
                </span>
                <div>
                  <strong className="block font-semibold">Your photos stay on your device</strong>
                  Image segmentation, color replacements, and exports run entirely inside your browser's WebAssembly sandbox. We do not store, view, or transmit your private images to our servers.
                </div>
              </div>

              <div>
                <h3 className="font-headline font-semibold text-[16px] text-[#111827] mb-1.5">
                  1. Local Processing &amp; Image Data
                </h3>
                <p>
                  When you upload an image to ColorCut, it is read into your browser's local memory via standard browser APIs (`FileReader`, `HTMLCanvasElement`, and WebAssembly). Your photo pixels are segmented by an ONNX neural network model running directly on your CPU or GPU. At no point is your image uploaded to a remote backend, persistent database, or third-party storage bucket.
                </p>
              </div>

              <div>
                <h3 className="font-headline font-semibold text-[16px] text-[#111827] mb-1.5">
                  2. External Model Asset Downloads
                </h3>
                <p>
                  To perform background segmentation without a heavy backend server, the application downloads pre-trained open-source neural network weights (such as the `isnet_fp16` model) and WebAssembly binary modules from public content delivery networks (CDNs, including `staticimgly.com` and public npm asset distributors). These requests only retrieve static machine-learning model files; no user photos or personal identifiers are sent with these requests. Once downloaded, modern browsers cache these assets to minimize bandwidth on subsequent uses.
                </p>
              </div>

              <div>
                <h3 className="font-headline font-semibold text-[16px] text-[#111827] mb-1.5">
                  3. Cookies and Analytics
                </h3>
                <p>
                  ColorCut does not use tracking cookies, cross-site profiling beacons, or advertising pixels. No personal registration or credit card information is collected.
                </p>
              </div>

              <div>
                <h3 className="font-headline font-semibold text-[16px] text-[#111827] mb-1.5">
                  4. Memory Lifecycle &amp; Temporary URLs
                </h3>
                <p>
                  Temporary image references created during editing (`blob:` URLs) are stored only in volatile browser memory and are revoked when you change images or close your browser tab.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-headline font-semibold text-[16px] text-[#111827] mb-1.5">
                  1. License &amp; Permitted Use
                </h3>
                <p>
                  ColorCut is provided free of charge for personal, educational, creative, and commercial use. You are free to process portrait headshots, e-commerce catalog items, marketing graphics, social media assets, and product photos.
                </p>
              </div>

              <div>
                <h3 className="font-headline font-semibold text-[16px] text-[#111827] mb-1.5">
                  2. Intellectual Property Rights
                </h3>
                <p>
                  You retain 100% of the copyright, trademark, and ownership rights to any images you upload and export using ColorCut. ColorCut claims no intellectual property interest in your content. No watermarks are applied, and no licensing fees or royalties are required.
                </p>
              </div>

              <div>
                <h3 className="font-headline font-semibold text-[16px] text-[#111827] mb-1.5">
                  3. Open-Source Component Attribution
                </h3>
                <p>
                  Client-side background separation is powered by `@imgly/background-removal`, licensed under the GNU Affero General Public License v3 (AGPLv3). In accordance with AGPLv3, the client application source code is publicly accessible and transparent.
                </p>
              </div>

              <div>
                <h3 className="font-headline font-semibold text-[16px] text-[#111827] mb-1.5">
                  4. Disclaimer of Warranties
                </h3>
                <p>
                  ColorCut is provided &quot;as is&quot; without warranties of any kind, whether express or implied. While the AI segmentation model strives for high precision, edge accuracy may vary based on photo resolution, contrast, subject lighting, and camera depth-of-field.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-headline font-semibold text-[16px] text-[#111827] mb-1.5">
                  Client-Side Architecture
                </h3>
                <p>
                  ColorCut is architected as an edge-ready, static single-page application (SPA). Instead of making slow, costly calls to cloud image-processing APIs, ColorCut compiles lightweight WebAssembly binaries and runs neural segmentation models directly inside your browser.
                </p>
              </div>

              <div className="bg-[#F9FAFB] p-4 rounded-xl border border-[#E5E7EB] font-mono text-[12px] space-y-1.5 text-[#111827]">
                <div className="text-[#4F46E5] font-semibold">// Pipeline Overview</div>
                <div>1. Input: JPG / PNG / WebP (up to 10 MB)</div>
                <div>2. Segmentation: ONNX Runtime WebAssembly (isnet_fp16)</div>
                <div>3. Canvas Compositing: 2D HTML Canvas with Alpha Channel</div>
                <div>4. Export: 32-bit Transparent PNG or 24-bit Solid Color JPG</div>
              </div>

              <div>
                <h3 className="font-headline font-semibold text-[16px] text-[#111827] mb-1.5">
                  Hosting &amp; Static Deployment
                </h3>
                <p>
                  Because ColorCut requires no Node.js backend or database, the entire application compiles to static HTML, CSS, and JavaScript, deployable on modern edge networks such as Cloudflare Pages, GitHub Pages, or any static hosting service.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#111827] mb-1.5">
                  How would you rate your cutout experience?
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedbackRating(star)}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                        feedbackRating >= star
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-[#F3F4F6] text-[#9CA3AF]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {feedbackRating >= star ? 'star' : 'star_outline'}
                      </span>
                    </button>
                  ))}
                  <span className="text-[12px] text-[#6B7280] ml-2 font-medium">
                    {feedbackRating === 5
                      ? 'Excellent'
                      : feedbackRating === 4
                      ? 'Very Good'
                      : feedbackRating === 3
                      ? 'Average'
                      : 'Needs Improvement'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#111827] mb-1.5">
                  Category
                </label>
                <select
                  value={feedbackCategory}
                  onChange={e => setFeedbackCategory(e.target.value)}
                  className="w-full px-3 py-2 text-[13px] bg-white border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4F46E5] text-[#111827]"
                >
                  <option value="general">General Feedback</option>
                  <option value="edge-quality">Cutout Edge / Hair Quality</option>
                  <option value="colors">Background Colors &amp; Picker</option>
                  <option value="export">Download / Export Issue</option>
                  <option value="feature-request">Feature Suggestion</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#111827] mb-1.5">
                  Your comments or suggestions
                </label>
                <textarea
                  rows={4}
                  required
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                  placeholder="Tell us what worked well or what we can improve..."
                  className="w-full p-3 text-[13px] bg-white border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#4F46E5] text-[#111827] resize-none"
                />
              </div>

              {feedbackSent ? (
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl flex items-center gap-2 text-[13px] font-medium">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Thank you! Your feedback has been received.</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-[13px] font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Submit Feedback</span>
                </button>
              )}
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-between">
          <div className="text-[12px] text-[#6B7280] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
            <span>Client-side WebAssembly Engine</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#111827] text-[13px] font-medium rounded-xl hover:bg-[#F3F4F6] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
