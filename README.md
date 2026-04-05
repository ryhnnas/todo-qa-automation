# 📝 To-Do App with E2E Automation

Aplikasi manajemen tugas To-Do List modern yang dibangun menggunakan ekosistem **React** dan **Supabase**, dengan fokus utama pada **Quality Assurance** melalui pengujian otomatis **End-to-End Testing** menggunakan **Playwright**.

---

## 🚀 Fitur Utama
Aplikasi ini dirancang untuk mensimulasikan alur kerja aplikasi SaaS (Software as a Service) nyata:
- **Secure Authentication:** Registrasi dan Login pengguna yang aman menggunakan Supabase Auth.
- **Real-time CRUD:** Tambah, lihat, tandai selesai (update), dan hapus tugas secara instan.
- **Database Integration:** Penyimpanan data persisten menggunakan PostgreSQL di platform Supabase.
- **Responsive UI:** Antarmuka bersih, cepat, dan modern menggunakan Tailwind CSS.

---

## 🤖 Quality Assurance & Automation
Proyek ini mengutamakan reliabilitas sistem. Saya mengimplementasikan **E2E Testing** untuk memastikan seluruh fitur kritis berjalan tanpa celah (*Zero Bug Policy*).

### **Test Suite: The Golden Journey**
Menggunakan **Playwright**, robot automation menjalankan skenario utuh dalam satu rangkaian (Single Video Recording):
- [x] **Registration Flow:** Menangani pengisian form, penanganan dialog (alert), hingga navigasi otomatis.
- [x] **Login System:** Verifikasi kredensial pengguna yang baru didaftarkan secara dinamis.
- [x] **Task Lifecycle:** Mengetes pembuatan tugas, perubahan status (checklist), hingga penghapusan tugas.
- [x] **Security & Logout:** Memastikan *Protected Routes* bekerja dan user diarahkan kembali ke Login setelah keluar.

---

## 🎥 Demo Automation (E2E Test)

> **Lihat automation beraksi dalam simulasi nyata:**
> ![E2E Testing Demo](./assets/e2e-demo.gif)

---

## 🛠️ Cara Menjalankan Project

### 1. Persiapan Awal
Pastikan kamu sudah memiliki Node.js terinstall di perangkat kamu.
```bash
# Clone repository ini
git clone https://github.com/USERNAME_KAMU/todo-qa-portfolio.git

# Masuk ke folder project
cd todo-qa-portfolio

# Install semua dependencies (Frontend & Playwright)
npm install
```
### 2. Konfigurasi Environment
Buat file .env di folder root dan masukkan kredensial Supabase kamu. Jangan pernah mengunggah file ini ke GitHub!

Cuplikan kode
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Menjalankan Pengujian (Testing)
Pastikan aplikasi frontend sudah berjalan di http://localhost:5173 (jalankan npm run dev di terminal terpisah).

```bash
# Menjalankan robot automation (Headless Mode)
npx playwright test

# Membuka laporan pengujian interaktif (HTML Report)
npx playwright show-report

# Menjalankan pengujian dengan tampilan UI (Watch Mode)
npx playwright test --ui
```

### 🏗️ Tech Stack
- Frontend: React.js, Tailwind CSS, Vite.
- Backend/Auth: Supabase (PostgreSQL).
- Testing Tool: Playwright (E2E Framework).
- Language: JavaScript (CJS).

Dikembangkan sebagai Latihan QA Automation.
