import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/samples';

export const FaqSection: React.FC = () => {
  // Independent open state per question allows expanding and collapsing independently
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleItem = (idx: number) => {
    setOpenIndices(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section className="py-16 md:py-24 bg-[#F9FAFB] border-b border-[#E5E7EB]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[12px] font-semibold text-[#4F46E5] uppercase tracking-wider">
            Help &amp; Transparency
          </span>
          <h2 className="text-[26px] sm:text-[34px] font-headline font-bold text-[#111827] mt-1.5 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[15px] text-[#6B7280] mt-2">
            Clear, honest answers regarding client-side processing, formats, and privacy.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            const answerId = `faq-answer-${idx}`;
            const headerId = `faq-header-${idx}`;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleItem(idx)}
                  className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer"
                >
                  <span className="font-headline font-semibold text-[15px] sm:text-[16px] text-[#111827]">
                    {item.question}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[#6B7280] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#4F46E5]' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={headerId}
                  className={`px-5 sm:px-6 pb-6 text-[14px] text-[#6B7280] leading-relaxed border-t border-[#E5E7EB]/60 pt-4 ${
                    isOpen ? 'block' : 'hidden'
                  }`}
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
