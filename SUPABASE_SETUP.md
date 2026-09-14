# Panduan Setup Database Supabase & Konfigurasi Environment

Dokumen ini berisi panduan langkah demi langkah untuk menghubungkan **IUDEX Web Portfolio** ke database **Supabase**.

---

## Langkah 1: Buat Project Baru di Supabase

1. Buka [Dashboard Supabase](https://supabase.com/dashboard) dan buat akun/login jika belum ada.
2. Klik tombol **New Project**.
3. Isi informasi project:
   - **Name**: `IUDEX-Web-Portfolio`
   - **Database Password**: (Simpan password database Anda dengan aman)
   - **Region**: Pilih lokasi terdekat (contoh: *Singapore / Southeast Asia*).
4. Klik **Create new project** dan tunggu proses inisialisasi (~1-2 menit).

---

## Langkah 2: Jalankan Script SQL Setup Database

1. Pada menu navigasi sebelah kiri Supabase Dashboard, pilih menu **SQL Editor** (ikon `<i/>`).
2. Klik tombol **+ New query**.
3. Salin (*copy*) seluruh isi file SQL yang ada pada proyek ini:
   [database/supabase_setup.sql](file:///c:/Users/muham/Documents/Github/IUDEX-Web-Portfolio/database/supabase_setup.sql)
4. Tempelkan (*paste*) kode SQL tersebut ke dalam SQL Editor Supabase.
5. Klik tombol **RUN** di pojok kanan bawah.
6. Anda akan melihat pesan keluaran: `Database Setup Complete!`.

---

## Langkah 3: Ambil Kredensial API (URL & Anon Key)

1. Pada Supabase Dashboard, buka menu **Project Settings** (ikon roda gigi `⚙️` di bagian bawah menu kiri).
2. Pilih sub-menu **API**.
3. Cari section **Project API keys**:
   - **Project URL**: Contoh `https://abcdefghijklm.supabase.co`
   - **Project API Key (`anon` `public`)**: Kunci publik API berawalan `eyJhbGciOi...`

---

## Langkah 4: Masukkan Kredensial ke `assets/js/config.js`

1. Buka file konfigurasi di dalam proyek web Anda:
   [assets/js/config.js](file:///c:/Users/muham/Documents/Github/IUDEX-Web-Portfolio/assets/js/config.js)
2. Ganti nilai `URL` dan `ANON_KEY` dengan kredensial dari Langkah 3:

```javascript
window.SUPABASE_CONFIG = {
    URL: 'https://xxxxxxxxxxxx.supabase.co', // Ganti dengan Project URL Anda
    ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // Ganti dengan public anon key Anda
};
```

3. Simpan file `config.js`.

---

## Langkah 5: Uji Coba Aplikasi Web

1. Jalankan aplikasi web dengan membuka [home.html](file:///c:/Users/muham/Documents/Github/IUDEX-Web-Portfolio/home.html) atau melalui Live Server.
2. Coba fitur-fitur berikut:
   - **Admin Login**: Buka [admin/login.html](file:///c:/Users/muham/Documents/Github/IUDEX-Web-Portfolio/admin/login.html), masuk dengan username `imyusi` dan password `99qr`.
   - **Lihat Data Projects**: Masuk ke [admin/projects.html](file:///c:/Users/muham/Documents/Github/IUDEX-Web-Portfolio/admin/projects.html) untuk melihat daftar proyek yang diambil langsung dari Supabase.
   - **Tambah Project**: Buka [admin/project-create.html](file:///c:/Users/muham/Documents/Github/IUDEX-Web-Portfolio/admin/project-create.html) untuk menambah proyek baru.
   - **Edit Project**: Klik tombol **Edit** pada tabel proyek untuk mengubah data.
   - **Hapus Project**: Klik tombol **Delete** pada tabel proyek.
   - **Galeri Publik**: Buka [gallery/gallery-aliya.html](file:///c:/Users/muham/Documents/Github/IUDEX-Web-Portfolio/gallery/gallery-aliya.html) untuk memverifikasi item galeri dinamis.

---

## Troubleshooting

- **Supabase Client error / Request Blocked**: Pastikan URL dan Anon Key pada `assets/js/config.js` sudah sesuai.
- **Tabel kosong saat login / fetch**: Pastikan Anda telah menjalankan script `supabase_setup.sql` yang membuat aturan RLS (Row Level Security) publik untuk membaca data.
