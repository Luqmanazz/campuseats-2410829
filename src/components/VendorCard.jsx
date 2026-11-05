
// Link digunakan supaya seluruh kad boleh ditekan untuk membuka halaman vendor.
import { Link } from 'react-router'

// Komponen ini menerima dan memaparkan maklumat satu vendor.
function VendorCard({ vendor }) {
  return (
    // Bina laluan vendor menggunakan ID unik vendor tersebut.
    <Link
      to={`/vendor/${vendor.id}`}
      className="vendor-card-modern"
    >
      {/* Bahagian atas kad memaparkan ikon, nama, dan status vendor. */}
      <div className="vendor-card-top">
        {/* Ikon hiasan disembunyikan daripada pembaca skrin kerana ia bukan kandungan penting. */}
        <div className="vendor-icon" aria-hidden="true">
          <span>▣</span>
        </div>

        {/* Paparkan nama vendor. */}
        <h3>{vendor.name}</h3>

        {/* Kelas dan teks status berubah mengikut sama ada vendor sedang dibuka. */}
        <span
          className={`status ${vendor.isOpen ? 'open' : 'closed'}`}
        >
          {vendor.isOpen ? 'Open' : 'Closed'}
        </span>
      </div>

      {/* Bahagian ini memaparkan lokasi dan waktu operasi vendor. */}
      <div className="vendor-card-details">
        <p>
          {/* Ikon lokasi hanya hiasan; lokasi sebenar dipaparkan sebagai teks. */}
          <span aria-hidden="true">⌖</span>
          {vendor.location}
        </p>

        <p>
          {/* Ikon jam hanya hiasan; waktu operasi dipaparkan sebagai teks. */}
          <span aria-hidden="true">◷</span>
          {vendor.openHours}
        </p>
      </div>
    </Link>
  )
}

// Export supaya kad vendor boleh digunakan dalam senarai vendor.
export default VendorCard
