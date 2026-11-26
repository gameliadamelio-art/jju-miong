import { useState, useMemo } from 'react';
import { Search, ArrowRight, BookOpen, Film, Disc3, X } from 'lucide-react';
import { CollectionItem, NavSection } from '../types/collection';
import { HERO_IMAGE } from '../data/collections';
import { CollectionCard } from '../components/CollectionCard';
import { filterAndSortCollections } from '../utils/filterCollections';

interface HomePageProps {
  collections: CollectionItem[];
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onSelectItem: (id: string) => void;
  onNavigate: (section: NavSection) => void;
}

type HighlightTab = 'rekomendasi' | 'terbaru' | 'populer';

export function HomePage({
  collections,
  bookmarks,
  onToggleBookmark,
  onSelectItem,
  onNavigate,
}: HomePageProps) {
  const [heroQuery, setHeroQuery] = useState('');
  const [highlightTab, setHighlightTab] = useState<HighlightTab>('rekomendasi');

  const searchResults = useMemo(() => {
    if (!heroQuery.trim()) return [];
    return filterAndSortCollections(collections, {
      query: heroQuery,
      genre: 'Semua',
      era: 'Semua Periode',
      creator: 'Semua',
      sortBy: 'terbaru',
    });
  }, [collections, heroQuery]);

  const featuredItems = useMemo(
    () => collections.filter((item) => item.featured).slice(0, 4),
    [collections]
  );

  const highlightItems = useMemo(() => {
    if (highlightTab === 'rekomendasi') {
      return collections.filter((item) => item.recommended).slice(0, 4);
    }
    if (highlightTab === 'terbaru') {
      return collections.filter((item) => item.isRecent).slice(0, 4);
    }
    return collections.filter((item) => item.isPopular).slice(0, 4);
  }, [collections, highlightTab]);

  const counts = useMemo(() => {
    return {
      sastra: collections.filter((i) => i.category === 'buku' || i.category === 'puisi').length,
      film: collections.filter((i) => i.category === 'film').length,
      musik: collections.filter((i) => i.category === 'musik').length,
    };
  }, [collections]);

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="bg-[#FAF9F3] border-b border-[#A6B59A]/45">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#556959]">
                Perpustakaan Digital Sastra &amp; Budaya Indonesia
              </p>

              <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-[#2C3A2F] leading-[1.1]">
                Perpustakaan Rona Rasa
              </h1>

              <p className="mt-3 font-serif italic text-xl sm:text-2xl text-[#405344]">
                “Dari Kata, Menuju Rasa.”
              </p>

              <p className="mt-5 text-base text-[#405344] leading-relaxed max-w-xl">
                Sebuah ruang baca dan arsip digital independen yang merawat karya sastra, puisi, sinema puitis, dan rekaman musik Indonesia—menghadirkan ketenangan dalam menelusuri jejak pemikiran dan ekspresi budaya Nusantara.
              </p>

              {/* Hero Search Bar */}
              <div className="mt-7 max-w-xl">
                <label htmlFor="hero-search" className="block text-xs font-semibold text-[#405344] mb-2">
                  Telusuri Arsip Rona Rasa
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Search
                      className="w-4 h-4 text-[#556959] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      id="hero-search"
                      type="search"
                      value={heroQuery}
                      onChange={(e) => setHeroQuery(e.target.value)}
                      placeholder="Cari judul buku, puisi, film, album, atau nama pencipta..."
                      className="w-full min-h-[44px] pl-10 pr-10 py-2.5 text-sm bg-[#F3F7EF] text-[#2C3A2F] placeholder:text-[#556959]/85 border border-[#A6B59A]/65 rounded-lg focus:outline-none focus:bg-[#FAF9F3] focus:border-[#405344]"
                    />
                    {heroQuery && (
                      <button
                        type="button"
                        onClick={() => setHeroQuery('')}
                        aria-label="Hapus pencarian"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#556959] hover:text-[#2C3A2F]"
                      >
                        <X className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate('sastra')}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold text-[#FAF9F3] bg-[#405344] hover:bg-[#2C3A2F] rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Masuk Ruang Sastra</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <figure className="lg:col-span-5 flex flex-col">
              <div className="flex-1 min-h-[260px] lg:min-h-[380px] rounded-xl overflow-hidden border border-[#A6B59A]/50 bg-[#E8F0E3]">
                <img
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="mt-2.5 text-xs font-serif italic text-[#556959]">
                Ilustrasi ruang baca tenang Perpustakaan Rona Rasa — tempat kata, citra, dan bunyi bertemu dalam ingatan.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Live Hero Search Results (only shown when user enters query) */}
      {heroQuery.trim() !== '' && (
        <section
          aria-label="Hasil pencarian beranda"
          className="bg-[#E8F0E3]/65 border-b border-[#A6B59A]/50 py-10"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C3A2F]">
                  Hasil Pencarian untuk “{heroQuery}”
                </h2>
                <p className="text-sm text-[#556959] mt-1" aria-live="polite">
                  Ditemukan <span className="font-semibold tabular-nums">{searchResults.length}</span> koleksi yang cocok
                </p>
              </div>
              <button
                type="button"
                onClick={() => setHeroQuery('')}
                className="min-h-[40px] px-4 py-2 text-xs font-semibold text-[#405344] bg-[#FAF9F3] border border-[#A6B59A]/60 hover:bg-[#DCE8D5] rounded-lg transition-colors"
              >
                Tutup Hasil Pencarian
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="bg-[#FAF9F3] border border-[#A6B59A]/50 rounded-xl p-8 text-center">
                <p className="font-serif text-xl text-[#2C3A2F]">
                  Belum ada karya yang sesuai dengan kata kunci tersebut.
                </p>
                <p className="mt-2 text-sm text-[#556959]">
                  Coba kata kunci lain seperti nama pengarang (Pramoedya, Sapardi, Chairil), sutradara (Garin, Mouly), atau musisi (Chrisye, Payung Teduh).
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {searchResults.map((item) => (
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
          </div>
        </section>
      )}

      {/* 2. Kategori Eksplorasi */}
      <section className="bg-[#F3F7EF] border-b border-[#A6B59A]/45 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#556959]">
                Pilar Arsip
              </p>
              <h2 className="mt-1 font-serif text-3xl font-semibold text-[#2C3A2F]">
                Kategori Eksplorasi Budaya
              </h2>
            </div>
            <p className="text-sm text-[#556959] max-w-md">
              Tiga ruang kuratorial yang menghimpun suara tulisan, gambar bergerak, dan gema musik Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-[#FAF9F3] border border-[#A6B59A]/50 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[#405344]">
                  <BookOpen className="w-5 h-5" aria-hidden="true" />
                  <span className="font-mono text-xs tabular-nums text-[#556959]">
                    {counts.sastra} Karya
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-[#2C3A2F]">
                  Sastra: Buku &amp; Puisi
                </h3>
                <p className="mt-2 text-sm text-[#556959] leading-relaxed">
                  Novel bersejarah, kumpulan cerpen, antologi puisi, esai kebudayaan, dan lembar sajak klasik Indonesia.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#A6B59A]/35">
                <button
                  type="button"
                  onClick={() => onNavigate('sastra')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#405344] hover:text-[#2C3A2F] py-1"
                >
                  <span>Telusuri Buku &amp; Puisi</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </article>

            <article className="bg-[#FAF9F3] border border-[#A6B59A]/50 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[#405344]">
                  <Film className="w-5 h-5" aria-hidden="true" />
                  <span className="font-mono text-xs tabular-nums text-[#556959]">
                    {counts.film} Karya
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-[#2C3A2F]">
                  Sastra Film Indonesia
                </h3>
                <p className="mt-2 text-sm text-[#556959] leading-relaxed">
                  Sinema Indonesia bernapas puitis yang memotret batin manusia, bentang alam, serta ingatan kolektif Nusantara.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#A6B59A]/35">
                <button
                  type="button"
                  onClick={() => onNavigate('film')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#405344] hover:text-[#2C3A2F] py-1"
                >
                  <span>Telusuri Arsip Film</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </article>

            <article className="bg-[#FAF9F3] border border-[#A6B59A]/50 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[#405344]">
                  <Disc3 className="w-5 h-5" aria-hidden="true" />
                  <span className="font-mono text-xs tabular-nums text-[#556959]">
                    {counts.musik} Album
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-[#2C3A2F]">
                  Arsip Musik Nusantara
                </h3>
                <p className="mt-2 text-sm text-[#556959] leading-relaxed">
                  Album musik lintas dekade—dari art-pop orkestral, eksperimen gamelan progresif, hingga folk independen.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#A6B59A]/35">
                <button
                  type="button"
                  onClick={() => onNavigate('musik')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#405344] hover:text-[#2C3A2F] py-1"
                >
                  <span>Telusuri Arsip Musik</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 3. Koleksi Pilihan (Featured Collections) */}
      <section className="bg-[#FAF9F3] py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#556959]">
                Kurasi Utama
              </p>
              <h2 className="mt-1 font-serif text-3xl font-semibold text-[#2C3A2F]">
                Koleksi Pilihan Bulan Ini
              </h2>
            </div>
            <p className="text-sm text-[#556959] max-w-md">
              Empat karya lintas medium yang saling berdialog mengenai sejarah, bahasa, dan keheningan ruang hidup Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <CollectionCard
                key={item.id}
                item={item}
                isBookmarked={bookmarks.includes(item.id)}
                onToggleBookmark={onToggleBookmark}
                onSelect={onSelectItem}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Pull Quote Interlude */}
      <section className="bg-[#E8F0E3]/60 border-y border-[#A6B59A]/45 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#2C3A2F] leading-relaxed">
            “Membaca karya sastra dan seni bangsa sendiri adalah cara paling lembut untuk mengenali luka, tawa, dan harapan yang kita warisi bersama.”
          </blockquote>
          <p className="mt-4 text-xs uppercase tracking-widest text-[#556959]">
            Catatan Kuratorial · Perpustakaan Rona Rasa
          </p>
        </div>
      </section>

      {/* 4. Rekomendasi, Koleksi Terbaru & Populer */}
      <section className="bg-[#FAF9F3] py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#556959]">
                Daftar Baca &amp; Apresiasi
              </p>
              <h2 className="mt-1 font-serif text-3xl font-semibold text-[#2C3A2F]">
                Rekomendasi, Terbaru &amp; Populer
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Pilih sorotan koleksi"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#E8F0E3] border border-[#A6B59A]/50 rounded-lg self-start"
            >
              <button
                type="button"
                role="tab"
                aria-selected={highlightTab === 'rekomendasi'}
                onClick={() => setHighlightTab('rekomendasi')}
                className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  highlightTab === 'rekomendasi'
                    ? 'bg-[#FAF9F3] text-[#2C3A2F] border border-[#A6B59A]/50'
                    : 'text-[#405344] hover:text-[#2C3A2F]'
                }`}
              >
                Rekomendasi Sastra
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={highlightTab === 'terbaru'}
                onClick={() => setHighlightTab('terbaru')}
                className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  highlightTab === 'terbaru'
                    ? 'bg-[#FAF9F3] text-[#2C3A2F] border border-[#A6B59A]/50'
                    : 'text-[#405344] hover:text-[#2C3A2F]'
                }`}
              >
                Koleksi Terbaru
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={highlightTab === 'populer'}
                onClick={() => setHighlightTab('populer')}
                className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  highlightTab === 'populer'
                    ? 'bg-[#FAF9F3] text-[#2C3A2F] border border-[#A6B59A]/50'
                    : 'text-[#405344] hover:text-[#2C3A2F]'
                }`}
              >
                Paling Banyak Diakses
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlightItems.map((item) => (
              <CollectionCard
                key={item.id}
                item={item}
                isBookmarked={bookmarks.includes(item.id)}
                onToggleBookmark={onToggleBookmark}
                onSelect={onSelectItem}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
