import { Bookmark } from 'lucide-react';
import { CollectionItem } from '../types/collection';
import { CATEGORY_LABELS } from '../data/collections';
import { CollectionArtwork } from './CollectionArtwork';

interface CollectionCardProps {
  item: CollectionItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelect: (id: string) => void;
}

export function CollectionCard({
  item,
  isBookmarked,
  onToggleBookmark,
  onSelect,
}: CollectionCardProps) {
  return (
    <article className="group flex flex-col bg-[#FAF9F3] border border-[#A6B59A]/50 rounded-xl p-4 transition-colors duration-200 hover:border-[#405344]/60 hover:bg-[#F3F7EF]">
      <button
        type="button"
        onClick={() => onSelect(item.id)}
        className="text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#405344] rounded-lg"
        aria-label={`Buka detail ${CATEGORY_LABELS[item.category]} ${item.title} oleh ${item.creator}`}
      >
        <CollectionArtwork item={item} />
      </button>

      <div className="mt-4 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 text-xs text-[#556959]">
          <div className="flex items-center gap-1.5 min-w-0 truncate">
            <span className="font-medium text-[#405344]">{CATEGORY_LABELS[item.category]}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{item.genre}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums shrink-0">{item.yearDisplay ?? item.year}</span>
          </div>

          <button
            type="button"
            onClick={() => onToggleBookmark(item.id)}
            aria-pressed={isBookmarked}
            aria-label={
              isBookmarked
                ? `Hapus ${item.title} dari koleksi tersimpan`
                : `Simpan ${item.title} ke koleksi favorit`
            }
            className={`inline-flex items-center justify-center min-w-[36px] min-h-[36px] rounded-lg border transition-colors shrink-0 ${
              isBookmarked
                ? 'bg-[#405344] text-[#FAF9F3] border-[#405344]'
                : 'bg-[#F3F7EF] text-[#405344] border-[#A6B59A]/50 hover:bg-[#E8F0E3]'
            }`}
          >
            <Bookmark
              className="w-4 h-4"
              fill={isBookmarked ? 'currentColor' : 'none'}
              aria-hidden="true"
            />
          </button>
        </div>

        <h3 className="mt-2 font-serif text-xl font-semibold text-[#2C3A2F] leading-snug">
          <button
            type="button"
            onClick={() => onSelect(item.id)}
            className="text-left hover:underline underline-offset-4 decoration-[#405344]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#405344] rounded"
          >
            {item.title}
          </button>
        </h3>

        <p className="mt-1 text-sm font-medium text-[#405344]">{item.creator}</p>

        <p className="mt-2.5 text-sm text-[#556959] leading-relaxed line-clamp-3 flex-1">
          {item.synopsis}
        </p>

        <div className="mt-4 pt-3 border-t border-[#A6B59A]/35 flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] text-[#556959] tabular-nums">
            {item.accessionCode}
          </span>
          <button
            type="button"
            onClick={() => onSelect(item.id)}
            className="text-xs font-semibold text-[#405344] hover:text-[#2C3A2F] underline underline-offset-4 decoration-[#A6B59A] hover:decoration-[#405344] py-1 px-1 whitespace-nowrap shrink-0"
          >
            Lihat detail
          </button>
        </div>
      </div>
    </article>
  );
}
