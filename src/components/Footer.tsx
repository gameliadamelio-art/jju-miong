import { NavSection } from '../types/collection';

interface FooterProps {
  onNavigate: (section: NavSection) => void;
  onOpenSaved: () => void;
}

export function Footer({ onNavigate, onOpenSaved }: FooterProps) {
  return (
    <footer className="bg-[#E8F0E3] border-t border-[#A6B59A]/55 text-[#405344] mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#A6B59A]/50">
          <div className="md:col-span-6">
            <p className="font-serif text-2xl font-semibold text-[#2C3A2F]">
              Perpustakaan Rona Rasa
            </p>
            <p className="mt-1 font-serif italic text-base text-[#405344]">
              “Dari Kata, Menuju Rasa.”
            </p>
            <p className="mt-4 text-sm text-[#556959] max-w-md leading-relaxed">
              Ruang perpustakaan digital independen yang menghimpun, mendokumentasikan, dan merayakan karya sastra, puisi, sinema puitis, serta arsip musik budaya Indonesia.
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#2C3A2F]">
              Jelajah Koleksi
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('beranda')}
                  className="hover:text-[#2C3A2F] hover:underline underline-offset-4 py-0.5"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('sastra')}
                  className="hover:text-[#2C3A2F] hover:underline underline-offset-4 py-0.5"
                >
                  Sastra (Buku &amp; Puisi)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('film')}
                  className="hover:text-[#2C3A2F] hover:underline underline-offset-4 py-0.5"
                >
                  Sastra Film
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('musik')}
                  className="hover:text-[#2C3A2F] hover:underline underline-offset-4 py-0.5"
                >
                  Arsip Musik
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#2C3A2F]">
              Lembaga &amp; Akses
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#2C3A2F] hover:underline underline-offset-4 py-0.5"
                >
                  Tentang Rona Rasa
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSaved}
                  className="hover:text-[#2C3A2F] hover:underline underline-offset-4 py-0.5"
                >
                  Koleksi Tersimpan
                </button>
              </li>
              <li className="text-[#556959] pt-1 text-xs leading-relaxed">
                Dirancang dengan standar keterbacaan &amp; aksesibilitas WCAG 2.2 AA untuk kenyamanan membaca lintas perangkat.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#556959]">
          <p>© {new Date().getFullYear()} Perpustakaan Rona Rasa. Arsip Literasi &amp; Budaya Indonesia.</p>
          <p>Pelestarian · Apresiasi · Penyebarluasan</p>
        </div>
      </div>
    </footer>
  );
}
