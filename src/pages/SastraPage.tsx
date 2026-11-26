import { useState, useMemo } from 'react';
import { CollectionItem, SortOption } from '../types/collection';
import { FilterBar } from '../components/FilterBar';
import { CollectionCard } from '../components/CollectionCard';
import {
  filterAndSortCollections,
  getUniqueCreators,
  getUniqueGenres,
} from '../utils/filterCollections';

interface SastraPageProps {
  collections: CollectionItem[];
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onSelectItem: (id: string) => void;
}

type SastraSubTab = 'semua' | 'buku' | 'puisi';

export function SastraPage({
  collections,
  bookmarks,
  onToggleBookmark,
  onSelectItem,
}: SastraPageProps) {
  const [subTab, setSubTab] = useState<SastraSubTab>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Semua');
  const [selectedEra, setSelectedEra] = useState('Semua Periode');
  const [selectedCreator, setSelectedCreator] = useState('Semua');
  const [sortBy, setSortBy] = useState<SortOption>('terbaru');

  const sastraBase = useMemo(() => {
    return collections.filter((item) => {
      if (subTab === 'semua') {
        return item.category === 'buku' || item.category === 'puisi';
      }
      return item.category === subTab;
    });
  }, [collections, subTab]);

  const genres = useMemo(() => getUniqueGenres(sastraBase), [sastraBase]);
  const creators = useMemo(() => getUniqueCreators(sastraBase), [sastraBase]);

  const filteredItems = useMemo(
    () =>
      filterAndSortCollections(sastraBase, {
        query: searchQuery,
        genre: selectedGenre,
        era: selectedEra,
        creator: selectedCreator,
        sortBy,
      }),
    [sastraBase, searchQuery, selectedGenre, selectedEra, selectedCreator, sortBy]
  );

  const handleTabChange = (tab: SastraSubTab) => {
    setSubTab(tab);
    setSelectedGenre('Semua');
    setSelectedCreator('Semua');
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedGenre('Semua');
    setSelectedEra('Semua Periode');
    setSelectedCreator('Semua');
    setSortBy('terbaru');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <header className="pb-8 border-b border-[#A6B59A]/45">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#556959]">
          Katalog Literasi
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold text-[#2C3A2F]">
          Sastra: Buku &amp; Puisi
        </h1>
        <p className="mt-3 text-base text-[#556959] max-w-2xl leading-relaxed">
          Menghimpun novel Indonesia, kumpulan cerita pendek, esai kebudayaan, antologi puisi, hingga lembar sajak klasik dari berbagai periode penerbitan.
        </p>

        {/* Sub-category selector */}
        <div
          role="tablist"
          aria-label="Filter jenis karya sastra"
          className="mt-6 inline-flex items-center gap-1 p-1 bg-[#E8F0E3] border border-[#A6B59A]/50 rounded-lg"
        >
          <button
            type="button"
            role="tab"
            aria-selected={subTab === 'semua'}
            onClick={() => handleTabChange('semua')}
            className={`min-h-[38px] px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              subTab === 'semua'
                ? 'bg-[#FAF9F3] text-[#2C3A2F] border border-[#A6B59A]/50'
                : 'text-[#405344] hover:text-[#2C3A2F]'
            }`}
          >
            Semua Sastra
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={subTab === 'buku'}
            onClick={() => handleTabChange('buku')}
            className={`min-h-[38px] px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              subTab === 'buku'
                ? 'bg-[#FAF9F3] text-[#2C3A2F] border border-[#A6B59A]/50'
                : 'text-[#405344] hover:text-[#2C3A2F]'
            }`}
          >
            Buku Sastra
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={subTab === 'puisi'}
            onClick={() => handleTabChange('puisi')}
            className={`min-h-[38px] px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              subTab === 'puisi'
                ? 'bg-[#FAF9F3] text-[#2C3A2F] border border-[#A6B59A]/50'
                : 'text-[#405344] hover:text-[#2C3A2F]'
            }`}
          >
            Puisi
          </button>
        </div>
      </header>

      <div className="mt-8">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          genres={genres}
          selectedEra={selectedEra}
          onEraChange={setSelectedEra}
          selectedCreator={selectedCreator}
          onCreatorChange={setSelectedCreator}
          creators={creators}
          creatorLabel="Penulis / Penyair"
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredItems.length}
          onReset={handleReset}
          searchPlaceholder="Cari judul buku, puisi, pengarang, atau penyair..."
        />
      </div>

      <section aria-label="Daftar koleksi buku dan puisi" className="mt-8">
        {filteredItems.length === 0 ? (
          <div className="bg-[#F3F7EF] border border-[#A6B59A]/50 rounded-xl p-10 text-center">
            <h2 className="font-serif text-2xl font-semibold text-[#2C3A2F]">
              Tidak ada koleksi yang sesuai
            </h2>
            <p className="mt-2 text-sm text-[#556959] max-w-md mx-auto">
              Ubah kata kunci pencarian atau atur ulang penyaring genre, periode, dan penulis untuk melihat seluruh arsip sastra.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 min-h-[40px] px-4 py-2 text-sm font-semibold text-[#FAF9F3] bg-[#405344] hover:bg-[#2C3A2F] rounded-lg transition-colors"
            >
              Tampilkan Semua Koleksi Sastra
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <CollectionCard
                key={item.id}
                item={item}
                isBookmarked={bookmarks.includes(item.id)}
                onToggleBookmark={onToggleBookmark}
                onSelect={onSelectItem}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
