# TODO: Tambahkan Animasi Scroll untuk Kartu Materi

## Status: In Progress

### Tugas Utama
- Tambahkan animasi masuk dari kiri dan kanan untuk kartu materi saat scroll di halaman materi.html

### Langkah-langkah Implementasi
- [ ] Tambahkan keyframe animasi slideInLeft dan slideInRight di css/main.css
- [ ] Update class .card di css/main.css untuk opacity dan transform default
- [ ] Tambahkan Intersection Observer di js/main.js untuk mendeteksi kartu masuk viewport
- [ ] Tambahkan class animasi berdasarkan index kartu (genap: kiri, ganjil: kanan)
- [ ] Test animasi dengan scroll menggunakan browser_action

### File yang Terpengaruh
- css/main.css: Menambahkan animasi CSS
- js/main.js: Menambahkan JavaScript untuk Intersection Observer

### Catatan
- Kartu pertama dan ketiga masuk dari kiri
- Kartu kedua dan keempat masuk dari kanan
- Animasi menggunakan ease-out dengan durasi 0.8s
