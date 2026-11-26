import { useState } from 'react';
import { Bookmark, Menu, X } from 'lucide-react';
import { NavSection } from '../types/collection';

interface NavbarProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  savedCount: number;
  onOpenSaved: () => void;
}

const NAV_ITEMS: { id: NavSection; label: string }[] = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'sastra', label: 'Sastra' },
  { id: 'film', label: 'Sastra Film' },
  { id: 'musik', label: 'Musik' },
  { id: 'about', label: 'About' },
];

export function Navbar({ activeSection, onNavigate, savedCount, onOpenSaved }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section: NavSection) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F3]/95 backdrop-blur-sm border-b border-[#A6B59A]/45">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('beranda')}
          className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#2C3A2F] whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
        >
          Perpustakaan Rona Rasa
        </button>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-6 lg:gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`py-2 text-sm whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                  isActive
                    ? 'font-semibold text-[#2C3A2F] border-[#405344]'
                    : 'font-medium text-[#556959] border-transparent hover:text-[#2C3A2F] hover:border-[#A6B59A]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenSaved}
            aria-label={`Buka koleksi tersimpan (${savedCount} karya)`}
            className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#FAF9F3] bg-[#405344] hover:bg-[#2C3A2F] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Bookmark className="w-4 h-4" aria-hidden="true" />
            <span>Tersimpan</span>
            <span className="font-mono tabular-nums text-xs opacity-90">({savedCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg border border-[#A6B59A]/60 bg-[#F3F7EF] text-[#405344] hover:bg-[#E8F0E3]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navigasi seluler"
          className="md:hidden bg-[#F3F7EF] border-t border-[#A6B59A]/45 px-4 py-3"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-sm transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-[#DCE8D5] text-[#2C3A2F] font-semibold'
                        : 'text-[#405344] hover:bg-[#E8F0E3]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="text-xs font-medium">Aktif</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
