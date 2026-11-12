# Spinly — Aplikasi Spin Wheel

Aplikasi spin wheel sederhana, responsif, dan siap di-deploy ke Vercel. Dibuat dengan HTML, CSS, dan JavaScript murni sehingga tidak membutuhkan database, backend, atau proses build.

## Fitur
- Roda berputar dengan animasi dan hasil acak.
- Tambah dan hapus pilihan (minimal 2, maksimal 20).
- Acak urutan pilihan dan reset ke daftar awal.
- Riwayat hingga 12 hasil terakhir.
- Salin hasil undian.
- Tombol keyboard **Spasi** untuk memutar.
- Tampilan responsif untuk desktop dan HP.
- Tidak membutuhkan API key atau database.

## Cara menjalankan di VS Code
1. Extract ZIP ini.
2. Buka VS Code → **File → Open Folder** → pilih folder `spin-wheel-vercel`.
3. Buka `index.html`.
4. Klik kanan → **Open with Live Server** (jika ekstensi Live Server sudah dipasang), atau buka `index.html` langsung di browser.

## Cara upload ke GitHub
1. Login ke GitHub dan buat repository baru, misalnya `spin-wheel`.
2. Jangan centang README / .gitignore / license saat membuat repository (karena file sudah tersedia).
3. Buka folder project di VS Code.
4. Buka Terminal → New Terminal, lalu jalankan:

```bash
git init
git add .
git commit -m "Initial commit - Spinly app"
git branch -M main
git remote add origin https://github.com/USERNAME/spin-wheel.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub kamu dan URL remote dengan URL repository milikmu.

## Cara deploy ke Vercel
1. Login ke [Vercel](https://vercel.com/) menggunakan akun GitHub.
2. Klik **Add New → Project**.
3. Pilih repository `spin-wheel` → **Import**.
4. Pada Framework Preset pilih **Other**.
5. Biarkan Build Command dan Output Directory kosong (atau gunakan default static output).
6. Klik **Deploy**.
7. Setelah selesai, Vercel memberikan alamat website seperti `nama-project.vercel.app`.

## Menghubungkan domain sendiri
1. Buka project di dashboard Vercel.
2. Pilih **Settings → Domains**.
3. Masukkan domain yang kamu miliki, lalu klik Add.
4. Ikuti instruksi DNS yang ditampilkan Vercel pada penyedia domain tempat kamu membeli domain.

## Catatan
- Project ini adalah website statis. Tidak perlu XAMPP, PHP, MySQL, atau `npm install`.
- Daftar pilihan dan riwayat akan kembali ke kondisi awal saat halaman di-refresh. Versi ini tidak menyimpan data ke database.
- Jika ingin menyimpan daftar pilihan secara permanen, fitur localStorage atau database bisa ditambahkan nanti.
