# Panduan Lengkap Setup Supabase, RLS Rules, dan Deployment Vercel

Dokumen ini berisi panduan teknis mendalam untuk menghubungkan **IUDEX Web Portfolio** ke Supabase, konfigurasi RLS Rules, pengisian kredensial API, serta prosedur deployment ke Vercel.

====================================================================
Langkah 1: Pembuatan Project di Supabase
====================================================================

1. Akses Supabase Dashboard pada tautan https://supabase.com/dashboard dan lakukan pendaftaran atau login.
2. Klik tombol New Project.
3. Masukkan nama project, password database, dan pilih region terdekat (misalnya Singapore).
4. Klik tombol Create new project dan tunggu hingga proses inisialisasi selesai.

====================================================================
Langkah 2: Eksekusi Script SQL dan Pembentukan RLS Rules
====================================================================

1. Pilih menu SQL Editor pada panel navigasi sebelah kiri Supabase Dashboard.
2. Klik tombol New query.
3. Salin seluruh kode SQL dari file database/supabase_schema.sql di dalam repositori.
4. Tempelkan kode ke dalam SQL Editor lalu klik tombol RUN.
5. Script secara otomatis membentuk tabel user, projects, site_analytics, menambahkan kolom role, serta mengaktifkan Row Level Security (RLS) Rules berikut:
   * Policy Public Read/Insert/Update/Delete User: Izinkan web admin membaca, menambah, memperbarui, dan menghapus data pengguna.
   * Policy Public Read/Insert/Update/Delete Projects: Izinkan web admin membaca, menambah, memperbarui, dan menghapus karya portofolio.
   * Policy Public Read/Insert Site Analytics: Melacak statistik pengunjung publik.

====================================================================
Langkah 3: Pengambilan Kredensial API yang Diperlukan
====================================================================

Agar aplikasi web dapat berjalan dan berkomunikasi dengan database, Anda hanya perlu menyalin dua buah string kredensial dari Supabase Dashboard:

1. Buka menu Project Settings (ikon roda gigi) di pojok kiri bawah Dashboard.
2. Pilih opsi menu API.
3. Salin dua string berikut:
   * Project URL: Berformat https://xxxxxxxxxxxx.supabase.co
   * anon public key: Berformat eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

====================================================================
Langkah 4: Konfigurasi Kredensial Lokal (assets/js/config.js)
====================================================================

1. Buka file assets/js/config.js pada repositori Anda.
2. Masukkan Project URL dan anon public key yang telah disalin:

```javascript
window.SUPABASE_CONFIG = {
    URL: 'https://xxxxxxxxxxxx.supabase.co',
    ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};
```

3. Simpan file. Nilai sensitif ini juga dapat Anda salin ke file .env lokal (file .env sudah otomatis masuk ke dalam daftar .gitignore sehingga aman dari commit git).

====================================================================
Langkah 5: Cara Memasukkan Kredensial saat Deployment di Vercel
====================================================================

Saat melakukan deployment proyek ke Vercel, Anda dapat mengonfigurasi kredensial Supabase melalui fitur Environment Variables Vercel:

1. Login ke Vercel Dashboard pada https://vercel.com dan klik Add New Project.
2. Impor repositori GitHub IUDEX-Web-Portfolio.
3. Pada halaman konfigurasi sebelum deploy, buka section Environment Variables.
4. Tambahkan dua variabel berikut:
   * Key: SUPABASE_URL | Value: https://xxxxxxxxxxxx.supabase.co
   * Key: SUPABASE_ANON_KEY | Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
5. Klik Deploy. Vercel akan mempublikasikan situs web statis Anda beserta akses Supabase secara otomatis.
