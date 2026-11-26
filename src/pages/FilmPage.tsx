import { useState, useMemo } from 'react';
import { CollectionItem, SortOption } from '../types/collection';
import { FilterBar } from '../components/FilterBar';
import { CollectionCard } from '../components/CollectionCard';
import {
  filterAndSortCollections,
  getUniqueCreators,
  getUniqueGenres,
} from '../utils/filterCollections';

interface FilmPageProps {
  collections: CollectionItem[];
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onSelectItem: (id: string) => void;
}

export function FilmPage({
  collections,
  bookmarks,
  onToggleBookmark,
  onSelectItem,
}: FilmPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Semua');
  const [selectedEra, setSelectedEra] = useState('Semua Periode');
  const [selectedCreator, setSelectedCreator] = useState('Semua');
  const [sortBy, setSortBy] = useState<SortOption>('terbaru');

  const filmBase = useMemo(
    () => collections.filter((item) => item.category === 'film'),
    [collections]
  );

  const genres = useMemo(() => getUniqueGenres(filmBase), [filmBase]);
  const creators = useMemo(() => getUniqueCreators(filmBase), [filmBase]);

  const filteredItems = useMemo(
    () =>
      filterAndSortCollections(filmBase, {
        query: searchQuery,
        genre: selectedGenre,
        era: selectedEra,
        creator: selectedCreator,
        sortBy,
      }),
    [filmBase, searchQuery, selectedGenre, selectedEra, selectedCreator, sortBy]
  );

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
          Arsip Gambar Bergerak
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold text-[#2C3A2F]">
          Sastra Film Indonesia
        </h1>
        <p className="mt-3 text-base text-[#556959] max-w-2xl leading-relaxed">
          Kumpulan film Indonesia pilihan yang memadukan kedalaman sastra, kepekaan visual, dan refleksi sosial-budaya Nusantara.
        </p>
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
          creatorLabel="Sutradara"
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredItems.length}
          onReset={handleReset}
          searchPlaceholder="Cari judul film, sutradara, pemeran, atau rumah produksi..."
        />
      </div>

      <section aria-label="Daftar koleksi sastra film" className="mt-8">
        {filteredItems.length === 0 ? (
          <div className="bg-[#F3F7EF] border border-[#A6B59A]/50 rounded-xl p-10 text-center">
            <h2 className="font-serif text-2xl font-semibold text-[#2C3A2F]">
              Film tidak ditemukan
            </h2>
            <p className="mt-2 text-sm text-[#556959] max-w-md mx-auto">
              Sesuaikan kata kunci atau atur ulang penyaring untuk melihat kembali seluruh arsip Sastra Film Indonesia.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 min-h-[40px] px-4 py-2 text-sm font-semibold text-[#FAF9F3] bg-[#405344] hover:bg-[#2C3A2F] rounded-lg transition-colors"
            >
              Atur Ulang Pencarian
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
