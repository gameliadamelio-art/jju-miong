import { useState, useEffect, useMemo, useCallback } from 'react';
import { COLLECTIONS } from './data/collections';
import { NavSection } from './types/collection';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SavedDrawer } from './components/SavedDrawer';
import { HomePage } from './pages/HomePage';
import { SastraPage } from './pages/SastraPage';
import { FilmPage } from './pages/FilmPage';
import { MusikPage } from './pages/MusikPage';
import { DetailPage } from './pages/DetailPage';
import { AboutPage } from './pages/AboutPage';

const BOOKMARKS_STORAGE_KEY = 'rona_rasa_bookmarks_v1';

function loadInitialBookmarks(): string[] {
  try {
    const raw = window.localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('beranda');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [returnSection, setReturnSection] = useState<NavSection>('beranda');
  const [bookmarks, setBookmarks] = useState<string[]>(loadInitialBookmarks);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    try {
      window.localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      // Ignore storage write failure in restricted contexts
    }
  }, [bookmarks]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigate = useCallback(
    (section: NavSection) => {
      setActiveSection(section);
      setSelectedItemId(null);
      scrollToTop();
    },
    [scrollToTop]
  );

  const handleSelectItem = useCallback(
    (id: string) => {
      setReturnSection(activeSection);
      setSelectedItemId(id);
      scrollToTop();
    },
    [activeSection, scrollToTop]
  );

  const handleBackToCatalog = useCallback(() => {
    setSelectedItemId(null);
    setActiveSection(returnSection);
    scrollToTop();
  }, [returnSection, scrollToTop]);

  const handleToggleBookmark = useCallback((id: string) => {
    const targetItem = COLLECTIONS.find((item) => item.id === id);
    setBookmarks((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((b) => b !== id) : [id, ...prev];
      if (targetItem) {
        setStatusMessage(
          exists
            ? `${targetItem.title} dihapus dari koleksi tersimpan.`
            : `${targetItem.title} disimpan ke koleksi favorit.`
        );
      }
      return next;
    });
  }, []);

  const selectedItem = useMemo(
    () => (selectedItemId ? COLLECTIONS.find((item) => item.id === selectedItemId) ?? null : null),
    [selectedItemId]
  );

  const savedItems = useMemo(
    () =>
      bookmarks
        .map((id) => COLLECTIONS.find((item) => item.id === id))
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    [bookmarks]
  );

  // Determine highlighted nav section even when viewing a detail page
  const navActiveSection: NavSection = selectedItem
    ? selectedItem.category === 'buku' || selectedItem.category === 'puisi'
      ? 'sastra'
      : selectedItem.category === 'film'
      ? 'film'
      : 'musik'
    : activeSection;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F3] text-[#405344]">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#405344] focus:text-[#FAF9F3] focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Lewati ke konten utama
      </a>

      {/* Screen-reader polite status announcements for bookmarks */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </div>

      <Navbar
        activeSection={navActiveSection}
        onNavigate={handleNavigate}
        savedCount={savedItems.length}
        onOpenSaved={() => setSavedDrawerOpen(true)}
      />

      <main id="main-content" className="flex-1" tabIndex={-1}>
        {selectedItem ? (
          <DetailPage
            item={selectedItem}
            allCollections={COLLECTIONS}
            isBookmarked={bookmarks.includes(selectedItem.id)}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onBack={handleBackToCatalog}
            onSelectItem={handleSelectItem}
            onNavigate={handleNavigate}
          />
        ) : activeSection === 'beranda' ? (
          <HomePage
            collections={COLLECTIONS}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onSelectItem={handleSelectItem}
            onNavigate={handleNavigate}
          />
        ) : activeSection === 'sastra' ? (
          <SastraPage
            collections={COLLECTIONS}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onSelectItem={handleSelectItem}
          />
        ) : activeSection === 'film' ? (
          <FilmPage
            collections={COLLECTIONS}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onSelectItem={handleSelectItem}
          />
        ) : activeSection === 'musik' ? (
          <MusikPage
            collections={COLLECTIONS}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onSelectItem={handleSelectItem}
          />
        ) : (
          <AboutPage onNavigate={handleNavigate} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} onOpenSaved={() => setSavedDrawerOpen(true)} />

      <SavedDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
        savedItems={savedItems}
        onSelectItem={handleSelectItem}
        onRemoveBookmark={handleToggleBookmark}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
