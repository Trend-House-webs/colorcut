import React from 'react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: 1,
      icon: 'cloud_upload',
      title: 'Select Your Image',
      subtitle: 'Upload without signing up',
      description:
        'Choose any JPG, PNG, or WebP photo up to 10MB from your device, or test with our sample photos. No account, sign-up, or registration is required to remove background from image free online.',
    },
    {
      num: 2,
      icon: 'auto_awesome',
      title: 'AI Background Removal',
      subtitle: 'In-browser neural segmentation',
      description:
        'Our neural segmentation model runs in your browser memory via WebAssembly, isolating the subject and making the background transparent with sub-pixel edge accuracy without sending photos to a server.',
    },
    {
      num: 3,
      icon: 'palette',
      title: 'Save PNG or Change Color',
      subtitle: 'Solid color or alpha export',
      description:
        'Download a transparent PNG or change photo background color online with 17 curated solid color presets or custom HEX values. Export full-resolution files with zero watermarks.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#E5E7EB]" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Direct Answer Block */}
        <div className="mb-14 p-6 sm:p-8 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB]">
          <div className="max-w-3xl">
            <span className="text-[12px] font-semibold text-[#4F46E5] uppercase tracking-wider">
              Quick Overview
            </span>
            <h2 className="text-[20px] sm:text-[24px] font-headline font-bold text-[#111827] mt-1 mb-2.5">
              What does ColorCut do?
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#4B5563] leading-relaxed">
              ColorCut removes the background from JPG, PNG, and WebP images in your browser. You can download the result as a transparent PNG or place the cutout on a solid-color background. No account is required.
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-[12px] font-semibold text-[#4F46E5] uppercase tracking-wider">
            Simple 3-Step Workflow
          </span>
          <h2 className="text-[26px] sm:text-[34px] font-headline font-bold text-[#111827] mt-1.5 tracking-tight">
            How ColorCut Works
          </h2>
          <p className="text-[15px] text-[#6B7280] mt-2 leading-relaxed">
            Remove background from image and make it transparent, or change image background color in three simple interactions.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map(step => (
            <div
              key={step.num}
              className="bg-[#F9FAFB] p-7 md:p-8 rounded-2xl border border-[#E5E7EB] shadow-xs hover:shadow-sm hover:border-indigo-200 transition-all duration-200 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#4F46E5] font-headline font-bold text-[16px]">
                    0{step.num}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#4F46E5] shadow-xs">
                    <span className="material-symbols-outlined text-[22px]">{step.icon}</span>
                  </div>
                </div>

                <span className="text-[12px] font-semibold text-[#4F46E5] uppercase tracking-wider block mb-1">
                  {step.subtitle}
                </span>

                <h3 className="font-headline font-semibold text-[19px] text-[#111827] mb-2.5">
                  {step.title}
                </h3>

                <p className="text-[14px] text-[#6B7280] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5E7EB]/70 flex items-center justify-between text-[12px] text-[#6B7280]">
                <span className="font-medium text-[#4F46E5]">Step {step.num} of 3</span>
                <a href="/how-it-works" className="hover:text-[#4F46E5] underline">
                  Detailed guide &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Honest Limitations & Technical Notes */}
        <div className="mt-12 p-6 sm:p-8 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB]">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-[20px] text-[#4F46E5]">info</span>
            <h3 className="font-headline font-bold text-[18px] text-[#111827]">
              Product Scope &amp; Honest Limitations
            </h3>
          </div>
          <p className="text-[14px] text-[#6B7280] leading-relaxed mb-4">
            ColorCut is specialized for fast, private, single-image background removal and solid-color replacement. To keep expectations clear:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-[#4B5563]">
            <div className="space-y-2.5 bg-white p-4 rounded-xl border border-[#E5E7EB]">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-emerald-600 mt-0.5 shrink-0">check_circle</span>
                <span><strong>Supported:</strong> Single JPG, PNG, or WebP images up to 10 MB.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-emerald-600 mt-0.5 shrink-0">check_circle</span>
                <span><strong>Supported:</strong> Lossless transparent PNG and 17 solid-color JPG exports with zero watermarks.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-emerald-600 mt-0.5 shrink-0">check_circle</span>
                <span><strong>First-use download:</strong> AI model weights (~20–40 MB) download once from CDN and are cached locally by your browser.</span>
              </div>
            </div>
            <div className="space-y-2.5 bg-white p-4 rounded-xl border border-[#E5E7EB]">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#9CA3AF] mt-0.5 shrink-0">cancel</span>
                <span><strong>Not provided:</strong> Generated background scenes or replacing backgrounds with external scenery photos.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#9CA3AF] mt-0.5 shrink-0">cancel</span>
                <span><strong>Not provided:</strong> Batch multi-image processing, video/GIF background removal, or passport cropping templates.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#9CA3AF] mt-0.5 shrink-0">cancel</span>
                <span><strong>Edge quality:</strong> Low-contrast boundaries, semi-transparent lace, or fine fur may have slight edge variance.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
