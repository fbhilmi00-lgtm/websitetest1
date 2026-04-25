# BelajarPro (Next.js)

Aplikasi langganan pembelajaran ringkas dengan harga **RM15/bulan** dan aliran bayaran manual.

## Ciri utama

- Laman utama (Landing) dengan hero, manfaat, kad harga, dan CTA `Subscribe Now`.
- Halaman Daftar / Log Masuk (nama, emel, telefon, kata laluan).
- Dashboard pengguna (status langganan, status bayaran, ID pengguna, modul pembelajaran terkunci/buka).
- Panel Admin untuk:
  - melihat semua pengguna,
  - menanda bayaran sebagai paid,
  - menjana/melihat user ID,
  - mengaktifkan langganan selama 30 hari.
- Simpanan data menggunakan fail JSON tempatan (`data/db.json`).

## Stack

- Next.js (App Router)
- React
- Local JSON database (untuk demo/MVP)

## Struktur data pengguna

Setiap pengguna menyimpan medan berikut:

- `user_id`
- `name`
- `email`
- `phone`
- `password`
- `subscription_status`
- `subscription_expiry`
- `payment_status`

Tambahan untuk kegunaan aplikasi:

- `is_admin`
- `proof_of_payment`

## Setup & jalankan

1. Pasang dependencies:

```bash
npm install
```

2. Jalankan development server:

```bash
npm run dev
```

3. Buka browser:

- `http://localhost:3000`

## Akaun admin demo

- Emel: `admin@belajar.my`
- Kata laluan: `Admin123!`

## Aliran bayaran manual (demo)

1. Pengguna daftar/log masuk.
2. Pengguna klik **Mula Langganan** di Dashboard.
3. Pengguna ikut arahan bank transfer / WhatsApp dan hantar bukti bayaran (placeholder teks).
4. Admin pergi ke halaman `/admin`.
5. Admin boleh:
   - `Tanda Paid`,
   - `Jana ID`,
   - `Aktif 30 Hari`.
6. Selepas `Aktif 30 Hari`, langganan pengguna menjadi aktif dan modul dibuka.

## Nota keselamatan

Ini ialah projek demo. Kata laluan disimpan secara plaintext dalam JSON untuk memudahkan prototaip. Untuk production, gunakan hash kata laluan, DB sebenar (SQLite/PostgreSQL), dan sistem pembayaran sebenar.
