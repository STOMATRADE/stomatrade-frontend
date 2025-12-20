# APP_NOTES - stomatrade-frontend

## Ringkasan
- Aplikasi Next.js 14 (App Router) untuk homepage Stomatrade (landing page staking).
- UI dibangun dengan Tailwind CSS, memakai token CSS custom melalui `src/styles/tailwind.css` dan global font Poppins/Plus Jakarta Sans.

## Stack & Dependensi Inti
- Next.js 14, React 18, TypeScript.
- Tailwind CSS + PostCSS.
- UI helper: `class-variance-authority` dan `tailwind-merge`.
- Charting: `recharts` (belum terlihat dipakai di file yang dibaca).
- Component tagger: `@dhiwise/component-tagger` dipasang sebagai webpack loader.

## Struktur Routing
- App Router di `src/app` dengan route group:
  - `src/app/(landing)` untuk landing (home, about).
  - `src/app/(admin)` untuk halaman admin (dashboard, project, farmer, user).
- Landing memakai layout konsisten di `src/app/(landing)/layout.tsx`.
- Admin memakai layout konsisten di `src/app/(admin)/layout.tsx`.
- Middleware mengarahkan `/staking` kembali ke `/` di `src/middleware.ts`.

## Layout & Metadata
- Ada dua file layout: `src/app/layout.tsx` dan `src/app/layout.jsx`.
  - `layout.jsx` berisi metadata Stomatrade + script Rocket.
  - `layout.tsx` berisi metadata template boilerplate.
  - Perlu cek mana yang dipakai oleh Next.js (umumnya hanya satu layout root aktif).

## UI Utama
- `src/app/HomePage.tsx`:
  - Client component dengan state untuk statistik staking, berita, posisi staking, dan live stats.
  - Simulasi data: `loadStakingData` memakai `setTimeout` 1 detik untuk data dummy.
  - Simulasi live update setiap 3 detik dengan `setInterval`.
  - Section besar: hero, stats, portfolio live, staking positions, reward info, governance, CTA, news, newsletter.

## Komponen UI
- `src/components/ui/Button.tsx`:
  - Variants via `cva`, merging via `tailwind-merge`.
  - Style utama lewat inline style props (font, warna, radius, bg).
- `src/components/ui/EditText.tsx`:
  - Input dengan variants + inline style props, default placeholder email.
- `src/components/common/Header.tsx`:
  - Header fixed dengan logo, nav, CTA, dan mobile drawer.
  - Mengunci scroll body saat mobile menu terbuka.
- `src/components/common/Footer.tsx`:
  - Footer konsisten untuk landing dan admin.

## Styling & Token
- `src/styles/index.css`:
  - Import Tailwind layer + font Google Fonts.
  - Set body background gelap + font keluarga.
- `src/styles/tailwind.css`:
  - Token CSS custom (warna, typography, spacing, radius).
- `tailwind.config.js`:
  - Mapping token CSS ke Tailwind theme (colors, fontSize, spacing, lineHeight, radius, width).

## Asset & Konten
- Gambar dan icon dirujuk dari `/public/images/...`.
- Konten bersifat marketing/landing untuk staking & komunitas.

## Scripts Penting
- `pnpm`/`npm` scripts di `package.json`:
  - `dev`: `next dev -p 4028`
  - `build`: `next build`
  - `start`: `next dev -p 4028` (sama seperti dev)
  - `serve`: `next start`
  - `type-check`: `tsc --noEmit`
  - `format`: `prettier --write "src/**/*.{ts,tsx,css,md,json}"`

## Catatan Teknis
- Banyak data bersifat dummy (hardcoded) di `HomePage`.
- `src/app/layout.tsx` menyisipkan script Rocket (analytics/telemetry) dari `static.rocket.new`.
- Perlu waspada jika menghapus dependencies yang ditandai `rocketCritical` di `package.json`.
- Komponen UI utama sudah dimigrasi ke `.tsx` (Header, Button, EditText, Footer).
