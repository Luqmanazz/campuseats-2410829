// StrictMode membantu mengesan masalah tertentu semasa pembangunan.
import { StrictMode } from 'react'
// createRoot menyediakan titik mula untuk React memaparkan aplikasi dalam halaman.
import { createRoot } from 'react-dom/client'
// Import gaya global yang digunakan oleh seluruh aplikasi.
import './index.css'
// Komponen akar yang mengandungi halaman dan navigasi aplikasi.
import App from './App.jsx'

// Cari elemen HTML ber-ID "root" dan jadikannya tempat aplikasi React dipaparkan.
createRoot(document.getElementById('root')).render(
  // StrictMode membantu mengesan masalah tertentu semasa pembangunan.
  <StrictMode>
    <App />
  </StrictMode>,
)
