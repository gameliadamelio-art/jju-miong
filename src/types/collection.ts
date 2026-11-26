export type CollectionCategory = 'buku' | 'puisi' | 'film' | 'musik';

export type NavSection = 'beranda' | 'sastra' | 'film' | 'musik' | 'about';

export type SortOption = 'terbaru' | 'judul-asc' | 'tahun-desc' | 'tahun-asc';

export interface BaseCollectionItem {
  id: string;
  accessionCode: string;
  category: CollectionCategory;
  title: string;
  creator: string;
  year: number;
  yearDisplay?: string;
  genre: string;
  era: string;
  synopsis: string;
  curatorialNote: string;
  coverUrl?: string;
  coverAlt: string;
  coverPalette: 'matcha' | 'sage' | 'ivory' | 'olive';
  coverMotif: 'botanical' | 'rain' | 'waves' | 'folklore' | 'cinema' | 'vinyl' | 'script';
  featured?: boolean;
  recommended?: boolean;
  isRecent?: boolean;
  isPopular?: boolean;
  addedOrder: number;
}

export interface BookItem extends BaseCollectionItem {
  category: 'buku';
  author: string;
  publisher: string;
  isbn: string | null;
  pageCount: number | null;
  language: string;
  collectionFormat: string;
  accessSource: string;
  accessUrl: string | null;
}

export interface PoemItem extends BaseCollectionItem {
  category: 'puisi';
  poet: string;
  anthology: string;
  theme: string;
  poemText: string[] | null;
  poemAccessNote: string;
}

export interface FilmItem extends BaseCollectionItem {
  category: 'film';
  director: string;
  duration: string;
  cast: string[];
  productionHouse: string;
  watchLabel: string;
  watchUrl: string | null;
}

export interface MusicTrack {
  number: number;
  title: string;
  duration: string;
}

export interface MusicItem extends BaseCollectionItem {
  category: 'musik';
  artist: string;
  label: string;
  tracklist: MusicTrack[];
  listenLabel: string;
  listenUrl: string | null;
}

export type CollectionItem = BookItem | PoemItem | FilmItem | MusicItem;
