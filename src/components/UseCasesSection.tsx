import React from 'react';

export type UseCaseType = 'profile' | 'ecommerce' | 'id' | 'social';

interface UseCasesSectionProps {
  onSelectUseCase?: (type: UseCaseType) => void;
  onSelectCategory?: (type: string) => void;
}

export const UseCasesSection: React.FC<UseCasesSectionProps> = ({
  onSelectUseCase,
  onSelectCategory,
}) => {
  const cards = [
    {
      id: 'profile' as UseCaseType,
      tag: 'LinkedIn & Resumes',
      title: 'Professional Profile Photos',
      description:
        'Eliminate cluttered domestic backdrops. Create crisp, professional portrait headshots with neutral studio tones for resumes, executive bios, and team directories.',
      cta: 'Try with profile portrait',
      imageUrl: '/assets/samples/male_portrait_headshot.jpg',
      imageFit: 'object-cover',
    },
    {
      id: 'ecommerce' as UseCaseType,
      tag: 'Amazon & Catalogs',
      title: 'E-commerce Product Images',
      description:
        'Isolate products on pure white backgrounds or custom brand colors to satisfy marketplace standards and improve consumer confidence and conversions.',
      cta: 'Try with product photo',
      imageUrl: '/assets/samples/headphones_original.jpg',
      imageFit: 'object-cover',
    },
    {
      id: 'id' as UseCaseType,
      tag: 'Neutral Framing',
      title: 'ID and Document Photos',
      description:
        'Create evenly lit portraits with clean, neutral off-white or light gray backgrounds. Note: Always verify official photo specifications with your local issuing agency.',
      cta: 'Try neutral document portrait',
      imageUrl: '/assets/samples/neutral_id_portrait.jpg',
      imageFit: 'object-cover',
    },
    {
      id: 'social' as UseCaseType,
      tag: 'YouTube & Socials',
      title: 'Social Media Content',
      description:
        'Produce vibrant cutout avatars, podcast covers, and thumbnail graphics on eye-catching solid colors designed to pop in modern social feeds.',
      cta: 'Try creator portrait',
      imageUrl: '/assets/samples/casual_male_portrait.jpg',
      imageFit: 'object-cover',
    },
  ];

  const handleCardClick = (id: UseCaseType) => {
    if (typeof onSelectUseCase === 'function') {
      onSelectUseCase(id);
    }
    if (typeof onSelectCategory === 'function') {
      onSelectCategory(id);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F9FAFB] border-b border-[#E5E7EB]" id="use-cases">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="text-[12px] font-semibold text-[#4F46E5] uppercase tracking-wider">
            Versatile Applications
          </span>
          <h2 className="text-[26px] sm:text-[34px] font-headline font-bold text-[#111827] mt-1.5 tracking-tight">
            Tailored For Every Creator &amp; Professional
          </h2>
          <p className="text-[15px] text-[#6B7280] mt-2 leading-relaxed">
            From executive headshots and e-commerce catalogs to creator graphics, produce high-resolution imagery in seconds.
          </p>
        </div>

        {/* 4 Responsive Cards Grid: 4 cols on desktop, 2 cols on tablet, 1 col on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="rounded-2xl border border-[#E5E7EB] bg-white hover:border-[#4F46E5] hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group cursor-pointer focus-within:ring-2 focus-within:ring-[#4F46E5]"
            >
              {/* Card Image Container: 4:3 Aspect Ratio with consistent sizing */}
              <div className="aspect-4/3 w-full overflow-hidden bg-[#F3F4F6] relative">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full ${card.imageFit} group-hover:scale-103 transition-transform duration-300`}
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[11px] font-medium text-[#111827] border border-[#E5E7EB] shadow-xs">
                  {card.tag}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline font-semibold text-[17px] text-[#111827] mb-2 leading-snug group-hover:text-[#4F46E5] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#E5E7EB] flex items-center text-[#4F46E5] text-[13px] font-semibold gap-1.5">
                  <span>{card.cta}</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
