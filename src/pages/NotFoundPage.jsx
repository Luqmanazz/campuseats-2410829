
// Link membolehkan pengguna kembali ke halaman utama tanpa memuat semula aplikasi.
import { Link } from 'react-router'

// Halaman ini dipaparkan apabila URL tidak sepadan dengan mana-mana laluan.
function NotFoundPage() {
  return (
    <section>
      {/* Terangkan bahawa halaman yang diminta tidak ditemui. */}
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      {/* Sediakan pautan untuk kembali ke senarai vendor. */}
      <Link to="/">Return to Vendors</Link>
    </section>
  )
}

// Export supaya halaman 404 boleh digunakan dalam konfigurasi laluan.
export default NotFoundPage
