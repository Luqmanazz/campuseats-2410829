
// Outlet memaparkan komponen halaman yang sepadan dengan laluan semasa.
import { Outlet } from 'react-router'
// Import bahagian atas dan bawah yang dikongsi oleh halaman aplikasi.
import Header from './Header.jsx'
import Footer from './Footer.jsx'

// Layout memastikan setiap halaman menggunakan struktur yang sama.
function Layout() {
  return (
    // Fragment membolehkan beberapa elemen dipulangkan tanpa elemen pembungkus tambahan.
    <>
      {/* Header dipaparkan pada semua halaman yang menggunakan Layout ini. */}
      <Header />
      {/* Kandungan halaman semasa dipaparkan di dalam kawasan utama. */}
      <main className="container">
        <Outlet />
      </main>
      {/* Footer dipaparkan selepas kandungan halaman. */}
      <Footer />
    </>
  )
}

// Export supaya Layout boleh digunakan dalam konfigurasi laluan aplikasi.
export default Layout
