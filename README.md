# Anggamart - Belanja Online

Website belanja online (mirip aplikasi Indomaret). HTML + CSS + JavaScript murni, tanpa instalasi.

## Cara menjalankan di VS Code
1. Ekstrak zip, lalu buka folder `anggamart` di VS Code (File > Open Folder).
2. Pasang ekstensi **Live Server** (VS Code akan menawarkannya otomatis).
3. Klik kanan `index.html` > **Open with Live Server**. Membuka `index.html` langsung di browser juga bisa.

## Struktur proyek
```
anggamart/
├── index.html
├── assets/favicon.svg
├── css/
│   ├── base.css        warna, reset, gaya dasar
│   ├── header.css      logo, pencarian, menu
│   ├── hero.css        banner dan promo hari ini
│   ├── catalog.css     kategori, grid, kartu produk
│   ├── buttons.css     tombol tambah, jumlah, favorit
│   ├── cart.css        panel keranjang dan kupon
│   ├── modal.css       modal dan formulir
│   ├── orders.css      riwayat pesanan
│   ├── toast.css       notifikasi
│   ├── footer.css
│   └── responsive.css  layar kecil
└── js/
    ├── data/           products.js, coupons.js  (edit produk/kupon di sini)
    ├── utils/          helpers.js, storage.js
    ├── state.js        keranjang, favorit, akun, pesanan
    ├── ui/             toast, modal, catalog, refresh, cart
    ├── features/       product-detail, wishlist, account, checkout, orders
    ├── events.js       semua event listener
    └── main.js         titik awal
```
Urutan `<script>` di `index.html` penting: data, utils, state, ui, features, events, main.

## Fitur
Katalog 26 produk, pencarian, filter kategori, urutan harga/diskon, detail produk, favorit,
keranjang, kupon (HEMAT10, BARU25, ONGKIRGRATIS), gratis ongkir mulai Rp100.000, masuk/daftar,
checkout (kurir/ambil di toko, metode bayar), riwayat pesanan dengan status otomatis, batalkan
pesanan, beli lagi, dan cek stok.

Data (keranjang, akun, pesanan) disimpan di localStorage; ini proyek demo tanpa server.

## Akun demo
- Email: demo@anggamart.com
- Kata sandi: demo123