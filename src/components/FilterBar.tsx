import { Search, X, RotateCcw } from 'lucide-react';
import { SortOption } from '../types/collection';
import { ERAS } from '../data/collections';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedGenre: string;
  onGenreChange: (value: string) => void;
  genres: string[];
  selectedEra: string;
  onEraChange: (value: string) => void;
  selectedCreator: string;
  onCreatorChange: (value: string) => void;
  creators: string[];
  creatorLabel?: string;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  totalResults: number;
  onReset: () => void;
  searchPlaceholder?: string;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  genres,
  selectedEra,
  onEraChange,
  selectedCreator,
  onCreatorChange,
  creators,
  creatorLabel = 'Pencipta',
  sortBy,
  onSortChange,
  totalResults,
  onReset,
  searchPlaceholder = 'Cari judul karya atau nama pencipta...',
}: FilterBarProps) {
  const hasActiveFilter =
    searchQuery.trim() !== '' ||
    selectedGenre !== 'Semua' ||
    selectedEra !== 'Semua Periode' ||
    selectedCreator !== 'Semua' ||
    sortBy !== 'terbaru';

  return (
    <section
      aria-label="Pencarian dan penyaringan koleksi"
      className="bg-[#F3F7EF] border border-[#A6B59A]/50 rounded-xl p-4 sm:p-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-5">
          <label htmlFor="catalog-search" className="block text-xs font-semibold text-[#405344] mb-1.5">
            Pencarian Koleksi
          </label>
          <div className="relative">
            <Search
              className="w-4 h-4 text-[#556959] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="catalog-search"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full min-h-[42px] pl-10 pr-10 py-2 text-sm bg-[#FAF9F3] text-[#2C3A2F] placeholder:text-[#556959]/80 border border-[#A6B59A]/60 rounded-lg focus:outline-none focus:border-[#405344]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Hapus kata kunci pencarian"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#556959] hover:text-[#2C3A2F] rounded-md"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Genre */}
        <div className="sm:col-span-4 lg:col-span-2">
          <label htmlFor="filter-genre" className="block text-xs font-semibold text-[#405344] mb-1.5">
            Genre / Tema
          </label>
          <select
            id="filter-genre"
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FAF9F3] text-[#2C3A2F] border border-[#A6B59A]/60 rounded-lg focus:outline-none focus:border-[#405344]"
          >
            <option value="Semua">Semua Genre</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Era / Tahun */}
        <div className="sm:col-span-4 lg:col-span-2">
          <label htmlFor="filter-era" className="block text-xs font-semibold text-[#405344] mb-1.5">
            Periode Tahun
          </label>
          <select
            id="filter-era"
            value={selectedEra}
            onChange={(e) => onEraChange(e.target.value)}
            className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FAF9F3] text-[#2C3A2F] border border-[#A6B59A]/60 rounded-lg focus:outline-none focus:border-[#405344]"
          >
            {ERAS.map((era) => (
              <option key={era} value={era}>
                {era}
              </option>
            ))}
          </select>
        </div>

        {/* Pencipta */}
        <div className="sm:col-span-4 lg:col-span-3">
          <label htmlFor="filter-creator" className="block text-xs font-semibold text-[#405344] mb-1.5">
            {creatorLabel}
          </label>
          <select
            id="filter-creator"
            value={selectedCreator}
            onChange={(e) => onCreatorChange(e.target.value)}
            className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FAF9F3] text-[#2C3A2F] border border-[#A6B59A]/60 rounded-lg focus:outline-none focus:border-[#405344]"
          >
            <option value="Semua">Semua {creatorLabel}</option>
            {creators.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bottom strip: count, sort, reset */}
      <div className="mt-4 pt-4 border-t border-[#A6B59A]/35 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-[#405344]" aria-live="polite">
          Menampilkan <span className="font-semibold tabular-nums">{totalResults}</span> karya dalam arsip
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="sort-order" className="text-xs font-semibold text-[#405344] whitespace-nowrap">
              Urutkan:
            </label>
            <select
              id="sort-order"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="min-h-[38px] px-3 py-1.5 text-sm bg-[#FAF9F3] text-[#2C3A2F] border border-[#A6B59A]/60 rounded-lg focus:outline-none focus:border-[#405344]"
            >
              <option value="terbaru">Koleksi Terbaru</option>
              <option value="judul-asc">Judul (A–Z)</option>
              <option value="tahun-desc">Tahun Terbit (Terbaru)</option>
              <option value="tahun-asc">Tahun Terbit (Terlama)</option>
            </select>
          </div>

          {hasActiveFilter && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 text-xs font-semibold text-[#405344] bg-[#E8F0E3] hover:bg-[#DCE8D5] border border-[#A6B59A]/60 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Atur Ulang
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
