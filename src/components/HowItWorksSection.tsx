import React from 'react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: 1,
      icon: 'cloud_upload',
      title: 'Upload an Image',
      description:
        'Choose any JPG, PNG, or WebP photo up to 10MB from your device. You can also select one of our curated male portrait or product test samples.',
    },
    {
      num: 2,
      icon: 'auto_awesome',
      title: 'Remove the Background',
      description:
        'Our neural segmentation model runs entirely in your browser memory, isolating the subject with sub-pixel edge and hair precision without uploading your data.',
    },
    {
      num: 3,
      icon: 'palette',
      title: 'Choose a Color & Download',
      description:
        'Pick from 17 curated solid color presets, sample any custom HEX code, or preserve transparent alpha. Export instant full-resolution PNG or JPG files with zero watermark.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#E5E7EB]" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-[12px] font-semibold text-[#4F46E5] uppercase tracking-wider">
            Simple 3-Step Workflow
          </span>
          <h2 className="text-[26px] sm:text-[34px] font-headline font-bold text-[#111827] mt-1.5 tracking-tight">
            How ColorCut Works
          </h2>
          <p className="text-[15px] text-[#6B7280] mt-2 leading-relaxed">
            Create professional portraits, product shots, and graphic cutouts in three effortless interactions.
          </p>
        </div>

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

                <h3 className="font-headline font-semibold text-[19px] text-[#111827] mb-2.5">
                  {step.title}
                </h3>

                <p className="text-[14px] text-[#6B7280] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5E7EB]/70 flex items-center text-[12px] text-[#4F46E5] font-medium">
                <span>Step {step.num} of 3</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
