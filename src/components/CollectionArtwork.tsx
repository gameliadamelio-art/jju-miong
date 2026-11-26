import { useState } from 'react';
import { CollectionItem } from '../types/collection';
import { CATEGORY_LABELS } from '../data/collections';

interface CollectionArtworkProps {
  item: CollectionItem;
  className?: string;
  priority?: boolean;
}

const PALETTE_STYLES: Record<
  CollectionItem['coverPalette'],
  { bg: string; inner: string; frame: string; ink: string; subtle: string }
> = {
  matcha: {
    bg: 'bg-[#E8F0E3]',
    inner: 'bg-[#F3F7EF]',
    frame: 'border-[#A6B59A]/70',
    ink: 'text-[#405344]',
    subtle: 'text-[#556959]',
  },
  sage: {
    bg: 'bg-[#DCE8D5]',
    inner: 'bg-[#FAF9F3]',
    frame: 'border-[#405344]/25',
    ink: 'text-[#2C3A2F]',
    subtle: 'text-[#405344]',
  },
  ivory: {
    bg: 'bg-[#FAF9F3]',
    inner: 'bg-[#F3F7EF]',
    frame: 'border-[#A6B59A]/60',
    ink: 'text-[#405344]',
    subtle: 'text-[#556959]',
  },
  olive: {
    bg: 'bg-[#E5ECE0]',
    inner: 'bg-[#FAF9F3]',
    frame: 'border-[#405344]/30',
    ink: 'text-[#2C3A2F]',
    subtle: 'text-[#556959]',
  },
};

function MotifIllustration({ motif }: { motif: CollectionItem['coverMotif'] }) {
  switch (motif) {
    case 'botanical':
      return (
        <svg viewBox="0 0 120 120" className="w-16 h-16 text-[#405344]/40" fill="none" aria-hidden="true">
          <path
            d="M60 100V22M60 80C44 76 34 62 34 46C48 48 58 60 60 76M60 64C76 60 86 46 86 30C72 32 62 44 60 60M60 44C49 40 42 30 42 20C52 22 58 30 60 40"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="60" cy="18" r="3" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case 'rain':
      return (
        <svg viewBox="0 0 120 120" className="w-16 h-16 text-[#405344]/40" fill="none" aria-hidden="true">
          <path
            d="M32 42L26 56M52 34L46 48M72 38L66 52M92 44L86 58M42 64L36 78M64 60L58 74M82 68L76 82"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M28 92C44 84 76 84 94 92"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'cinema':
      return (
        <svg viewBox="0 0 120 120" className="w-16 h-16 text-[#405344]/40" fill="none" aria-hidden="true">
          <rect x="24" y="30" width="72" height="56" rx="3" stroke="currentColor" strokeWidth="1.4" />
          <path d="M24 44H96M24 72H96" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="60" cy="58" r="9" stroke="currentColor" strokeWidth="1.3" />
          <path d="M57 54L65 58L57 62V54Z" fill="currentColor" />
        </svg>
      );
    case 'vinyl':
    case 'waves':
      return (
        <svg viewBox="0 0 120 120" className="w-16 h-16 text-[#405344]/40" fill="none" aria-hidden="true">
          <circle cx="60" cy="60" r="34" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="60" cy="60" r="24" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="60" cy="60" r="10" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="60" cy="60" r="2.5" fill="currentColor" />
        </svg>
      );
    case 'folklore':
      return (
        <svg viewBox="0 0 120 120" className="w-16 h-16 text-[#405344]/40" fill="none" aria-hidden="true">
          <path
            d="M60 22L88 60L60 98L32 60L60 22Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <circle cx="60" cy="60" r="12" stroke="currentColor" strokeWidth="1.2" />
          <path d="M60 36V48M60 72V84M36 60H48M72 60H84" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 120 120" className="w-16 h-16 text-[#405344]/40" fill="none" aria-hidden="true">
          <path d="M32 34H88M32 50H80M32 66H84M32 82H64" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="80" cy="82" r="5" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
  }
}

export function CollectionArtwork({ item, className = '', priority = false }: CollectionArtworkProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const aspectClass = item.category === 'musik' ? 'aspect-square' : 'aspect-[3/4]';
  const palette = PALETTE_STYLES[item.coverPalette];

  if (item.coverUrl && !imgFailed) {
    return (
      <div
        className={`relative overflow-hidden rounded-lg bg-[#E8F0E3] border border-[#A6B59A]/40 ${aspectClass} ${className}`}
      >
        <img
          src={item.coverUrl}
          alt={item.coverAlt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setImgFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  // Museum-grade archival typographic plate fallback & bespoke cover edition
  return (
    <div
      role="img"
      aria-label={item.coverAlt}
      className={`relative overflow-hidden rounded-lg border ${palette.frame} ${palette.bg} ${aspectClass} p-4 flex flex-col justify-between ${className}`}
    >
      <div className={`h-full w-full rounded-md border ${palette.frame} ${palette.inner} p-4 flex flex-col justify-between`}>
        <div className="flex items-center justify-between gap-2 border-b border-[#A6B59A]/40 pb-2">
          <span className={`font-mono text-[10px] tracking-wider uppercase ${palette.subtle}`}>
            {item.accessionCode}
          </span>
          <span className={`text-[11px] font-medium ${palette.subtle}`}>
            {CATEGORY_LABELS[item.category]}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center text-center my-auto py-2">
          <MotifIllustration motif={item.coverMotif} />
          <h4 className={`mt-3 font-serif text-lg sm:text-xl font-semibold leading-snug line-clamp-3 ${palette.ink}`}>
            {item.title}
          </h4>
          <p className={`mt-1.5 text-xs font-medium line-clamp-1 ${palette.subtle}`}>
            {item.creator}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-[#A6B59A]/40 pt-2 text-[11px]">
          <span className={`${palette.subtle} truncate max-w-[70%]`}>{item.genre}</span>
          <span className={`font-mono tabular-nums ${palette.ink}`}>{item.yearDisplay ?? item.year}</span>
        </div>
      </div>
    </div>
  );
}
