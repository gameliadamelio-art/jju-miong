import { CollectionItem, SortOption } from '../types/collection';

export interface FilterParams {
  query: string;
  genre: string;
  era: string;
  creator: string;
  sortBy: SortOption;
}

export function filterAndSortCollections(
  items: CollectionItem[],
  { query, genre, era, creator, sortBy }: FilterParams
): CollectionItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = items.filter((item) => {
    if (genre !== 'Semua' && item.genre !== genre) {
      return false;
    }
    if (era !== 'Semua Periode' && item.era !== era) {
      return false;
    }
    if (creator !== 'Semua' && item.creator !== creator) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const baseMatch =
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.creator.toLowerCase().includes(normalizedQuery) ||
      item.genre.toLowerCase().includes(normalizedQuery) ||
      item.synopsis.toLowerCase().includes(normalizedQuery) ||
      String(item.year).includes(normalizedQuery);

    if (baseMatch) return true;

    if (item.category === 'buku') {
      return (
        item.publisher.toLowerCase().includes(normalizedQuery) ||
        (item.isbn ? item.isbn.toLowerCase().includes(normalizedQuery) : false)
      );
    }
    if (item.category === 'puisi') {
      return (
        item.anthology.toLowerCase().includes(normalizedQuery) ||
        item.theme.toLowerCase().includes(normalizedQuery)
      );
    }
    if (item.category === 'film') {
      return (
        item.productionHouse.toLowerCase().includes(normalizedQuery) ||
        item.cast.some((actor) => actor.toLowerCase().includes(normalizedQuery))
      );
    }
    if (item.category === 'musik') {
      return (
        item.label.toLowerCase().includes(normalizedQuery) ||
        item.tracklist.some((track) => track.title.toLowerCase().includes(normalizedQuery))
      );
    }

    return false;
  });

  return [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'judul-asc':
        return a.title.localeCompare(b.title, 'id');
      case 'tahun-desc':
        return b.year - a.year || a.title.localeCompare(b.title, 'id');
      case 'tahun-asc':
        return a.year - b.year || a.title.localeCompare(b.title, 'id');
      case 'terbaru':
      default:
        return b.addedOrder - a.addedOrder;
    }
  });
}

export function getUniqueGenres(items: CollectionItem[]): string[] {
  return Array.from(new Set(items.map((item) => item.genre))).sort((a, b) =>
    a.localeCompare(b, 'id')
  );
}

export function getUniqueCreators(items: CollectionItem[]): string[] {
  return Array.from(new Set(items.map((item) => item.creator))).sort((a, b) =>
    a.localeCompare(b, 'id')
  );
}
