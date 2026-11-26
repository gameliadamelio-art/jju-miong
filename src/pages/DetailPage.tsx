import { ArrowLeft, Bookmark, ExternalLink } from 'lucide-react';
import { CollectionItem, NavSection } from '../types/collection';
import { CATEGORY_LABELS } from '../data/collections';
import { CollectionArtwork } from '../components/CollectionArtwork';
import { CollectionCard } from '../components/CollectionCard';

interface DetailPageProps {
  item: CollectionItem;
  allCollections: CollectionItem[];
  isBookmarked: boolean;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onBack: () => void;
  onSelectItem: (id: string) => void;
  onNavigate: (section: NavSection) => void;
}

const MISSING_LABEL = 'Data belum tersedia';

function MetadataRow({ label, value }: { label: string; value: string | number | null | undefined }) {
  const displayValue =
    value === null || value === undefined || String(value).trim() === ''
      ? MISSING_LABEL
      : String(value);

  const isMissing = displayValue === MISSING_LABEL;

  return (
    <div className="py-3 border-b border-[#A6B59A]/40 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
      <dt className="sm:col-span-4 text-xs font-semibold uppercase tracking-wider text-[#556959]">
        {label}
      </dt>
      <dd
        className={`sm:col-span-8 text-sm ${
          isMissing ? 'italic text-[#556959]' : 'font-medium text-[#2C3A2F]'
        }`}
      >
        {displayValue}
      </dd>
    </div>
  );
}

export function DetailPage({
  item,
  allCollections,
  isBookmarked,
  bookmarks,
  onToggleBookmark,
  onBack,
  onSelectItem,
  onNavigate,
}: DetailPageProps) {
  const categorySection: NavSection =
    item.category === 'buku' || item.category === 'puisi'
      ? 'sastra'
      : item.category === 'film'
      ? 'film'
      : 'musik';

  const relatedItems = allCollections
    .filter((other) => other.id !== item.id && other.category === item.category)
    .slice(0, 3);

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Action & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#A6B59A]/45">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-sm font-semibold text-[#405344] bg-[#F3F7EF] hover:bg-[#DCE8D5] border border-[#A6B59A]/60 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Kembali ke Katalog</span>
          </button>

          <nav aria-label="Jejak lokasi arsip" className="text-xs text-[#556959] flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('beranda')}
              className="hover:text-[#2C3A2F] hover:underline underline-offset-4"
            >
              Beranda
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              onClick={() => onNavigate(categorySection)}
              className="hover:text-[#2C3A2F] hover:underline underline-offset-4"
            >
              {CATEGORY_LABELS[item.category]}
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#2C3A2F] font-medium truncate max-w-[200px] sm:max-w-xs">
              {item.title}
            </span>
          </nav>
        </div>

        <button
          type="button"
          onClick={() => onToggleBookmark(item.id)}
          aria-pressed={isBookmarked}
          className={`inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-sm font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
            isBookmarked
              ? 'bg-[#405344] text-[#FAF9F3] border-[#405344] hover:bg-[#2C3A2F]'
              : 'bg-[#FAF9F3] text-[#405344] border-[#A6B59A]/65 hover:bg-[#E8F0E3]'
          }`}
        >
          <Bookmark
            className="w-4 h-4"
            fill={isBookmarked ? 'currentColor' : 'none'}
            aria-hidden="true"
          />
          <span>{isBookmarked ? 'Tersimpan di Favorit' : 'Simpan ke Favorit'}</span>
        </button>
      </div>

      {/* Main Detail Layout */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Artwork Frame */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="bg-[#F3F7EF] border border-[#A6B59A]/50 rounded-xl p-4">
            <CollectionArtwork item={item} priority />
            <div className="mt-3 pt-3 border-t border-[#A6B59A]/40 flex items-center justify-between text-xs text-[#556959]">
              <span className="font-mono tabular-nums">No. Arsip: {item.accessionCode}</span>
              <span>{CATEGORY_LABELS[item.category]}</span>
            </div>
          </div>
        </div>

        {/* Right: Title, Synopsis, Structured Metadata */}
        <div className="lg:col-span-8">
          <div className="pb-6 border-b border-[#A6B59A]/45">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#556959]">
              {CATEGORY_LABELS[item.category]} · {item.genre} ·{' '}
              <span className="tabular-nums">{item.yearDisplay ?? item.year}</span>
            </p>
            <h1 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold text-[#2C3A2F] leading-tight">
              {item.title}
            </h1>
            <p className="mt-2 text-lg font-medium text-[#405344]">{item.creator}</p>
          </div>

          {/* Sinopsis / Deskripsi */}
          <section aria-labelledby="heading-synopsis" className="mt-6">
            <h2 id="heading-synopsis" className="font-serif text-2xl font-semibold text-[#2C3A2F]">
              {item.category === 'musik' ? 'Deskripsi Album' : 'Deskripsi & Sinopsis'}
            </h2>
            <p className="mt-3 text-base text-[#405344] leading-relaxed max-w-prose">
              {item.synopsis}
            </p>
            <p className="mt-3 text-sm italic text-[#556959] leading-relaxed max-w-prose">
              Catatan kuratorial: {item.curatorialNote}
            </p>
          </section>

          {/* Poem Reading Space (only for Puisi) */}
          {item.category === 'puisi' && (
            <section
              aria-labelledby="heading-poem-body"
              className="mt-8 bg-[#F3F7EF] border border-[#A6B59A]/55 rounded-xl p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#A6B59A]/45">
                <h2 id="heading-poem-body" className="font-serif text-2xl font-semibold text-[#2C3A2F]">
                  Naskah Puisi
                </h2>
                <span className="text-xs text-[#556959]">{item.poet}</span>
              </div>

              {item.poemText ? (
                <div className="mt-6 font-serif text-lg sm:text-xl text-[#2C3A2F] leading-[1.9] max-w-prose space-y-1">
                  {item.poemText.map((line, index) =>
                    line === '' ? (
                      <div key={index} className="h-4" aria-hidden="true" />
                    ) : (
                      <p key={index}>{line}</p>
                    )
                  )}
                </div>
              ) : (
                <div className="mt-5 p-4 bg-[#FAF9F3] border border-[#A6B59A]/45 rounded-lg">
                  <p className="text-sm text-[#405344] leading-relaxed">
                    {item.poemAccessNote}
                  </p>
                </div>
              )}

              {item.poemText && (
                <p className="mt-6 pt-4 border-t border-[#A6B59A]/40 text-xs text-[#556959]">
                  {item.poemAccessNote}
                </p>
              )}
            </section>
          )}

          {/* Music Tracklist (only for Musik) */}
          {item.category === 'musik' && (
            <section
              aria-labelledby="heading-tracklist"
              className="mt-8 bg-[#F3F7EF] border border-[#A6B59A]/55 rounded-xl p-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#A6B59A]/45">
                <h2 id="heading-tracklist" className="font-serif text-2xl font-semibold text-[#2C3A2F]">
                  Daftar Lagu (Tracklist)
                </h2>
                <span className="font-mono text-xs text-[#556959] tabular-nums">
                  {item.tracklist.length} Trek
                </span>
              </div>

              <ol className="mt-2 divide-y divide-[#A6B59A]/35">
                {item.tracklist.map((track) => (
                  <li
                    key={track.number}
                    className="py-3 flex items-center justify-between gap-4 text-sm"
                  >
                    <div className="flex items-baseline gap-3 min-w-0">
                      <span className="font-mono text-xs text-[#556959] tabular-nums w-6 shrink-0">
                        {String(track.number).padStart(2, '0')}
                      </span>
                      <span className="font-medium text-[#2C3A2F] truncate">{track.title}</span>
                    </div>
                    <span className="font-mono text-xs text-[#556959] tabular-nums shrink-0">
                      {track.duration || MISSING_LABEL}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Structured Metadata Grid */}
          <section aria-labelledby="heading-metadata" className="mt-8">
            <h2 id="heading-metadata" className="font-serif text-2xl font-semibold text-[#2C3A2F]">
              Metadata Koleksi
            </h2>

            <dl className="mt-3 border-t border-[#A6B59A]/45">
              {item.category === 'buku' && (
                <>
                  <MetadataRow label="Judul Buku" value={item.title} />
                  <MetadataRow label="Nama Pengarang" value={item.author} />
                  <MetadataRow label="Penerbit" value={item.publisher} />
                  <MetadataRow label="Tahun Terbit" value={item.year} />
                  <MetadataRow label="ISBN" value={item.isbn} />
                  <MetadataRow
                    label="Jumlah Halaman"
                    value={item.pageCount ? `${item.pageCount} halaman` : null}
                  />
                  <MetadataRow label="Bahasa" value={item.language} />
                  <MetadataRow label="Genre / Subjek" value={item.genre} />
                  <MetadataRow label="Format Koleksi" value={item.collectionFormat} />
                  <div className="py-3 border-b border-[#A6B59A]/40 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                    <dt className="sm:col-span-4 text-xs font-semibold uppercase tracking-wider text-[#556959]">
                      Sumber / Tautan Akses
                    </dt>
                    <dd className="sm:col-span-8 text-sm font-medium text-[#2C3A2F]">
                      <p>{item.accessSource}</p>
                      {item.accessUrl ? (
                        <a
                          href={item.accessUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#405344] hover:text-[#2C3A2F] underline underline-offset-4"
                        >
                          <span>Telusuri Katalog Nasional (OneSearch)</span>
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <p className="mt-1 text-xs italic text-[#556959]">
                          Tautan akses daring: {MISSING_LABEL}
                        </p>
                      )}
                    </dd>
                  </div>
                </>
              )}

              {item.category === 'puisi' && (
                <>
                  <MetadataRow label="Judul Puisi" value={item.title} />
                  <MetadataRow label="Nama Penyair" value={item.poet} />
                  <MetadataRow label="Tahun Publikasi" value={item.yearDisplay ?? item.year} />
                  <MetadataRow label="Antologi / Sumber" value={item.anthology} />
                  <MetadataRow label="Tema / Kategori" value={item.theme} />
                </>
              )}

              {item.category === 'film' && (
                <>
                  <MetadataRow label="Judul Film" value={item.title} />
                  <MetadataRow label="Sutradara" value={item.director} />
                  <MetadataRow label="Tahun Rilis" value={item.year} />
                  <MetadataRow label="Durasi" value={item.duration} />
                  <MetadataRow label="Genre" value={item.genre} />
                  <MetadataRow
                    label="Pemeran Utama"
                    value={item.cast.length > 0 ? item.cast.join(', ') : null}
                  />
                  <MetadataRow label="Rumah Produksi" value={item.productionHouse} />
                  <div className="py-3 border-b border-[#A6B59A]/40 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                    <dt className="sm:col-span-4 text-xs font-semibold uppercase tracking-wider text-[#556959]">
                      Tautan Menonton Resmi
                    </dt>
                    <dd className="sm:col-span-8 text-sm">
                      {item.watchUrl ? (
                        <a
                          href={item.watchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-semibold text-[#405344] hover:text-[#2C3A2F] underline underline-offset-4"
                        >
                          <span>{item.watchLabel}</span>
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="italic text-[#556959]">{MISSING_LABEL}</span>
                      )}
                    </dd>
                  </div>
                </>
              )}

              {item.category === 'musik' && (
                <>
                  <MetadataRow label="Nama Album" value={item.title} />
                  <MetadataRow label="Musisi / Band" value={item.artist} />
                  <MetadataRow label="Tahun Rilis" value={item.year} />
                  <MetadataRow label="Label Rekaman" value={item.label} />
                  <MetadataRow label="Genre" value={item.genre} />
                  <div className="py-3 border-b border-[#A6B59A]/40 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                    <dt className="sm:col-span-4 text-xs font-semibold uppercase tracking-wider text-[#556959]">
                      Tautan Mendengarkan Resmi
                    </dt>
                    <dd className="sm:col-span-8 text-sm">
                      {item.listenUrl ? (
                        <a
                          href={item.listenUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-semibold text-[#405344] hover:text-[#2C3A2F] underline underline-offset-4"
                        >
                          <span>{item.listenLabel}</span>
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="italic text-[#556959]">{MISSING_LABEL}</span>
                      )}
                    </dd>
                  </div>
                </>
              )}
            </dl>
          </section>
        </div>
      </div>

      {/* Related Works */}
      {relatedItems.length > 0 && (
        <section
          aria-labelledby="heading-related"
          className="mt-16 pt-10 border-t border-[#A6B59A]/45"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 id="heading-related" className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C3A2F]">
              Karya Terkait dalam Kategori {CATEGORY_LABELS[item.category]}
            </h2>
            <button
              type="button"
              onClick={() => onNavigate(categorySection)}
              className="text-xs font-semibold text-[#405344] hover:text-[#2C3A2F] underline underline-offset-4 whitespace-nowrap"
            >
              Lihat semua
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedItems.map((related) => (
              <CollectionCard
                key={related.id}
                item={related}
                isBookmarked={bookmarks.includes(related.id)}
                onToggleBookmark={onToggleBookmark}
                onSelect={onSelectItem}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
