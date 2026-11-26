import { useEffect } from 'react';
import { X, Trash2, ArrowRight, Bookmark } from 'lucide-react';
import { CollectionItem, NavSection } from '../types/collection';
import { CATEGORY_LABELS } from '../data/collections';
import { CollectionArtwork } from './CollectionArtwork';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: CollectionItem[];
  onSelectItem: (id: string) => void;
  onRemoveBookmark: (id: string) => void;
  onNavigate: (section: NavSection) => void;
}

export function SavedDrawer({
  isOpen,
  onClose,
  savedItems,
  onSelectItem,
  onRemoveBookmark,
  onNavigate,
}: SavedDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="saved-drawer-title">
      <div
        className="fixed inset-0 bg-[#2C3A2F]/35 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className="relative z-10 w-full max-w-md bg-[#FAF9F3] border-l border-[#A6B59A]/60 h-full flex flex-col">
        <div className="px-6 py-5 border-b border-[#A6B59A]/45 flex items-center justify-between gap-4 bg-[#F3F7EF]">
          <div>
            <h2 id="saved-drawer-title" className="font-serif text-2xl font-semibold text-[#2C3A2F]">
              Koleksi Tersimpan
            </h2>
            <p className="text-xs text-[#556959] mt-0.5 tabular-nums">
              {savedItems.length} karya ditandai sebagai bacaan &amp; arsip favorit
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup panel koleksi tersimpan"
            className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] rounded-lg border border-[#A6B59A]/50 bg-[#FAF9F3] text-[#405344] hover:bg-[#E8F0E3]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {savedItems.length === 0 ? (
            <div className="py-12 px-4 text-center bg-[#F3F7EF] border border-[#A6B59A]/45 rounded-xl">
              <Bookmark className="w-8 h-8 text-[#556959] mx-auto" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-xl font-semibold text-[#2C3A2F]">
                Belum ada koleksi tersimpan
              </h3>
              <p className="mt-2 text-sm text-[#556959] leading-relaxed">
                Tandai buku, puisi, film, atau album musik yang ingin Anda baca dan telusuri kembali di lain waktu.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate('sastra');
                }}
                className="mt-5 inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-sm font-semibold text-[#FAF9F3] bg-[#405344] hover:bg-[#2C3A2F] rounded-lg transition-colors"
              >
                <span>Jelajahi Koleksi Sastra</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {savedItems.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 p-3.5 bg-[#F3F7EF] border border-[#A6B59A]/45 rounded-xl"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelectItem(item.id);
                      onClose();
                    }}
                    className="w-20 shrink-0 rounded-md overflow-hidden"
                    aria-label={`Buka detail ${item.title}`}
                  >
                    <CollectionArtwork item={item} />
                  </button>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-[#556959] truncate">
                        {CATEGORY_LABELS[item.category]} · <span className="tabular-nums">{item.yearDisplay ?? item.year}</span>
                      </p>
                      <h3 className="mt-1 font-serif text-lg font-semibold text-[#2C3A2F] leading-snug truncate">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectItem(item.id);
                            onClose();
                          }}
                          className="hover:underline underline-offset-4 text-left"
                        >
                          {item.title}
                        </button>
                      </h3>
                      <p className="text-xs text-[#405344] truncate mt-0.5">{item.creator}</p>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectItem(item.id);
                          onClose();
                        }}
                        className="text-xs font-semibold text-[#405344] hover:text-[#2C3A2F] underline underline-offset-4 py-1"
                      >
                        Buka arsip
                      </button>

                      <button
                        type="button"
                        onClick={() => onRemoveBookmark(item.id)}
                        aria-label={`Hapus ${item.title} dari koleksi tersimpan`}
                        className="inline-flex items-center gap-1 text-xs text-[#556959] hover:text-[#2C3A2F] px-2 py-1 rounded-md hover:bg-[#E8F0E3] transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
