# PUSTU Dukuh - Aplikasi Kesehatan Modern

Aplikasi kesehatan profesional untuk Puskesmas Pembantu Dukuh dengan dukungan PWA (Progressive Web App).

## Fitur Utama

### 1. Sistem Login
- **Admin**: Manajemen semua data aplikasi
- **Petugas**: Manajemen absensi dan laporan harian
- **Kader Pustu**: Skrining kesehatan dan kunjungan rumah
- **Kader Posyandu**: Skrining kesehatan di posyandu

### 2. Menu Petugas
- Absensi Petugas dengan detail tanggal, nama Pustu, dan data petugas
- Laporan harian pasien (BPJS, Umum, Gratis)
- Laporan berdasarkan jenis kelamin

### 3. Menu Kader Pustu
- **Absensi Kader**: Dengan foto selfi dan export ke Excel/PDF
- **Skrining Kesehatan**:
  - Skrining HT (Hipertensi)
  - Skrining DM (Diabetes Melitus)
  - Skrining ADL (Activities of Daily Living)
  - Skrining SKILAS
  - Skrining Obesitas (Otomatis hitung IMT)
  - Skrining PUMA
  - Skrining TB (Tuberkulosis)
- **Riwayat Skrining**: Export ke Excel/PDF
- **Kunjungan Rumah**: Tracking pasien yang dikunjungi
- **Pemantauan Wilayah**: Monitoring kesehatan, lingkungan, dan bencana alam
- **Laporan Harian**: Link ke Google Sheets

### 4. Menu Kader Posyandu
- **Skrining Kesehatan**: Sama dengan Kader Pustu dengan pilihan Posyandu
- **Input Data Posyandu**: Link ke Google Form
- **Rekomendasi Alkes**: Link ke Shopee

### 5. Menu Admin
- Manajemen dan penghapusan semua data

## Teknologi

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Framer Motion
- **State Management**: Zustand
- **Database**: Firebase Realtime Database & Firestore
- **Storage**: Firebase Storage
- **Authentication**: Firebase Auth
- **PWA**: Service Worker + Web App Manifest
- **Export**: XLSX, jsPDF, html2canvas

## Setup

### 1. Clone Repository
```bash
git clone https://github.com/uzamroh/pustu-dukuh.git
cd pustu-dukuh
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Firebase
1. Buat project di [Firebase Console](https://console.firebase.google.com)
2. Copy konfigurasi Firebase Anda
3. Buat file `.env.local`:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Development
```bash
npm run dev
```

### 5. Build Production
```bash
npm run build
```

## Struktur Project

```
src/
├── components/        # React Components
├── pages/             # Page Components
├── services/          # Firebase Services
├── stores/            # Zustand Stores
├── types/             # TypeScript Types
├── utils/             # Utility Functions
├── styles/            # Global Styles
├── hooks/             # Custom Hooks
└── main.tsx          # Entry Point
```

## Lisensi

Proprietary - Puskesmas Pembantu Dukuh