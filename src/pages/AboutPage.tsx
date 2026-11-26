import { ArrowRight } from 'lucide-react';
import { NavSection } from '../types/collection';
import { HERO_IMAGE } from '../data/collections';

interface AboutPageProps {
  onNavigate: (section: NavSection) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <header className="pb-10 border-b border-[#A6B59A]/45">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#556959]">
          Tentang Perpustakaan
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold text-[#2C3A2F] leading-tight">
          Perpustakaan Rona Rasa
        </h1>
        <p className="mt-3 font-serif italic text-xl sm:text-2xl text-[#405344]">
          “Dari Kata, Menuju Rasa.”
        </p>
      </header>

      {/* Latar Belakang */}
      <section className="py-10 border-b border-[#A6B59A]/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <h2 className="font-serif text-3xl font-semibold text-[#2C3A2F]">
            Latar Belakang
          </h2>
          <p className="mt-4 text-base text-[#405344] leading-relaxed">
            Perpustakaan Rona Rasa lahir dari keinginan menghadirkan ruang sunyi dan ramah di tengah riuhnya linimasa digital—sebuah tempat di mana karya sastra, puisi, sinema puitis, dan rekaman musik Indonesia dirawat dalam satu ekosistem pengarsipan yang rapi, hangat, dan mudah dijangkau siapa saja.
          </p>
          <p className="mt-4 text-base text-[#405344] leading-relaxed">
            Alih-alih tampil sebagai toko buku daring atau basis data kaku, Rona Rasa dirancang seperti ruang baca independen: memberi waktu bagi pengunjung untuk mengenal konteks penciptaan karya, membaca catatan kuratorial, serta menghubungkan satu ekspresi seni Nusantara dengan ekspresi lainnya.
          </p>
        </div>

        <figure className="lg:col-span-5">
          <div className="rounded-xl overflow-hidden border border-[#A6B59A]/50 bg-[#E8F0E3] aspect-[4/3]">
            <img
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="mt-2 text-xs font-serif italic text-[#556959]">
            Suasana ruang baca Perpustakaan Rona Rasa dalam palet hijau matcha lembut dan gading hangat.
          </figcaption>
        </figure>
      </section>

      {/* Visi & Misi */}
      <section className="py-10 border-b border-[#A6B59A]/40 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#F3F7EF] border border-[#A6B59A]/50 rounded-xl p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#556959]">
            Visi
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-[#2C3A2F]">
            Ruang Ingatan Budaya yang Terbuka
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#405344] leading-relaxed">
            Menjadi ruang perpustakaan digital independen yang menumbuhkan kedekatan generasi masa kini terhadap kekayaan sastra, sinema, dan musik Indonesia melalui kurasi yang jujur, inklusif, dan nyaman dinikmati.
          </p>
        </div>

        <div className="bg-[#F3F7EF] border border-[#A6B59A]/50 rounded-xl p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#556959]">
            Misi
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-[#2C3A2F]">
            Merawat, Mencatat, Menghubungkan
          </h2>
          <ul className="mt-3 space-y-2.5 text-sm sm:text-base text-[#405344] leading-relaxed list-disc pl-5">
            <li>Mendokumentasikan metadata karya secara terstruktur dan transparan tanpa mengarang informasi.</li>
            <li>Menyediakan ruang baca serta penelusuran koleksi yang memenuhi prinsip aksesibilitas web.</li>
            <li>Menghubungkan pembaca dan penikmat seni dengan sumber resmi penerbit, sinema, dan musisi.</li>
          </ul>
        </div>
      </section>

      {/* Tujuan & Jenis Koleksi */}
      <section className="py-10 border-b border-[#A6B59A]/40">
        <h2 className="font-serif text-3xl font-semibold text-[#2C3A2F]">
          Tujuan Pengembangan &amp; Jenis Koleksi
        </h2>
        <p className="mt-3 text-base text-[#405344] leading-relaxed max-w-3xl">
          Perpustakaan digital ini dikembangkan agar siapa pun—pelajar, peneliti, penikmat sastra, maupun pembaca kasual—dapat menemukan referensi awal karya budaya Indonesia dalam antarmuka yang tenang, bebas distraksi iklan, dan ramah bagi kebutuhan aksesibilitas.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-[#FAF9F3] border border-[#A6B59A]/50 rounded-xl">
            <h3 className="font-serif text-xl font-semibold text-[#2C3A2F]">Buku Sastra</h3>
            <p className="mt-2 text-sm text-[#556959] leading-relaxed">
              Novel, kumpulan cerpen, antologi puisi, dan esai kebudayaan beserta detail bibliografi lengkap.
            </p>
          </div>
          <div className="p-5 bg-[#FAF9F3] border border-[#A6B59A]/50 rounded-xl">
            <h3 className="font-serif text-xl font-semibold text-[#2C3A2F]">Puisi</h3>
            <p className="mt-2 text-sm text-[#556959] leading-relaxed">
              Arsip sajak dengan catatan antologi, tema, serta teks utuh apabila ketentuan hak akses memungkinkan.
            </p>
          </div>
          <div className="p-5 bg-[#FAF9F3] border border-[#A6B59A]/50 rounded-xl">
            <h3 className="font-serif text-xl font-semibold text-[#2C3A2F]">Sastra Film</h3>
            <p className="mt-2 text-sm text-[#556959] leading-relaxed">
              Film Indonesia bernilai artistik dan sastrawi lengkap dengan sutradara, pemeran, dan rumah produksi.
            </p>
          </div>
          <div className="p-5 bg-[#FAF9F3] border border-[#A6B59A]/50 rounded-xl">
            <h3 className="font-serif text-xl font-semibold text-[#2C3A2F]">Musik</h3>
            <p className="mt-2 text-sm text-[#556959] leading-relaxed">
              Album musik lintas dekade disertai daftar lagu (tracklist), label rekaman, dan tautan platform resmi.
            </p>
          </div>
        </div>
      </section>

      {/* Nilai Utama */}
      <section className="py-10">
        <h2 className="font-serif text-3xl font-semibold text-[#2C3A2F]">
          Nilai yang Kami Bawa
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#E8F0E3]/70 border border-[#A6B59A]/55 rounded-xl">
            <p className="font-mono text-xs text-[#556959]">01</p>
            <h3 className="mt-2 font-serif text-2xl font-semibold text-[#2C3A2F]">Pelestarian</h3>
            <p className="mt-2 text-sm text-[#405344] leading-relaxed">
              Mencatat jejak terbitan, tahun rilis, penyair, pembuat film, dan musisi agar karya penting lintas generasi tidak tenggelam oleh waktu.
            </p>
          </div>
          <div className="p-6 bg-[#E8F0E3]/70 border border-[#A6B59A]/55 rounded-xl">
            <p className="font-mono text-xs text-[#556959]">02</p>
            <h3 className="mt-2 font-serif text-2xl font-semibold text-[#2C3A2F]">Apresiasi</h3>
            <p className="mt-2 text-sm text-[#405344] leading-relaxed">
              Menghargai hak cipta dan ketelitian data; menyertakan catatan kuratorial yang membantu pembaca memahami konteks estetika tiap karya.
            </p>
          </div>
          <div className="p-6 bg-[#E8F0E3]/70 border border-[#A6B59A]/55 rounded-xl">
            <p className="font-mono text-xs text-[#556959]">03</p>
            <h3 className="mt-2 font-serif text-2xl font-semibold text-[#2C3A2F]">Penyebarluasan</h3>
            <p className="mt-2 text-sm text-[#405344] leading-relaxed">
              Membuka jalan bagi pembaca baru untuk menemukan karya sastra dan budaya Indonesia melalui pencarian yang mudah dan antarmuka yang ramah.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate('sastra')}
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold text-[#FAF9F3] bg-[#405344] hover:bg-[#2C3A2F] rounded-lg transition-colors"
          >
            <span>Mulai Menjelajahi Sastra</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('beranda')}
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold text-[#405344] bg-[#F3F7EF] hover:bg-[#DCE8D5] border border-[#A6B59A]/60 rounded-lg transition-colors"
          >
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </section>
    </div>
  );
}
