
// Link digunakan untuk membuka semula vendor bagi item yang pernah dilihat.
import { Link } from 'react-router'
// Hook untuk memuatkan vendor bersama status pemuatan, ralat dan cuba semula.
import { useVendors } from '../hooks/useVendors.js'
// Hook untuk membaca dan mengosongkan senarai item yang baru dilihat.
import { useRecentlyViewed } from '../hooks/useRecentlyViewed.js'
// Kad vendor untuk memaparkan setiap vendor.
import VendorCard from '../components/VendorCard.jsx'
// Paparan status pemuatan dan ralat yang boleh dicuba semula.
import { Loading, ErrorMessage } from '../components/Status.jsx'

// Halaman utama memaparkan pengenalan, item terkini dan vendor.
function HomePage() {
  // Dapatkan data vendor serta status permintaan daripada hook.
  const { vendors, loading, error, reload } = useVendors()
  // Dapatkan senarai item terkini dan fungsi untuk mengosongkannya.
  const { recentItems, clearRecentlyViewed } = useRecentlyViewed()

  // Tunjukkan status pemuatan sementara data vendor diambil.
  if (loading) {
    return <Loading />
  }

  // Tunjukkan ralat bersama tindakan untuk memuatkan semula data.
  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />
  }

  // Paparkan kandungan utama selepas data vendor selesai dimuatkan.
  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-label">IIUM CAMPUS FOOD HUB</p>
          <h1>
            Find your next meal
            <br />
            at CampusEats
          </h1>
          <p className="hero-description">
            Order from your favourite campus vendors, anytime.
          </p>
        </div>

        <div className="hero-decoration" aria-hidden="true">
          <span>🍃</span>
          <span>🍽️</span>
          <span>🍃</span>
        </div>
      </section>

      {/* Recently Viewed */}
      {/* Bahagian ini hanya muncul jika ada item yang pernah dilihat. */}
      {recentItems.length > 0 && (
        <section className="recent-section">
          <div className="section-heading recent-heading">
            <div>
              <div className="heading-title">
                <span className="heading-icon">◷</span>
                <h2>Recently Viewed</h2>
              </div>
              <p className="muted">
                Your recently viewed menu items (up to 5).
              </p>
            </div>

            <button
              type="button"
              className="clear-recent-btn"
              onClick={clearRecentlyViewed}
            >
              Clear All
            </button>
          </div>

          <div className="recent-grid">
            {/* Gabungan ID vendor dan item menghasilkan key unik; pautan membuka vendor asal. */}
            {recentItems.map((item) => (
              <Link
                key={`${item.vendorId}-${item.id}`}
                to={`/vendor/${item.vendorId}`}
                className="recent-card"
              >
                <div className="recent-item-icon" aria-hidden="true">
                  🍴
                </div>

                <div className="recent-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.vendorName}</p>
                  <span className="recent-price">
                    RM {Number(item.price).toFixed(2)}
                  </span>
                </div>

                <span className="recent-arrow" aria-hidden="true">
                  ›
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Today's Vendors */}
      {/* Paparkan mesej kosong atau senarai vendor bergantung pada data yang diterima. */}
      <section className="vendors-section">
        <div className="section-heading">
          <div className="heading-title">
            <span className="heading-icon">▣</span>
            <h2>Today's Vendors</h2>
          </div>
          <p className="muted">
            Discover food vendors around your campus.
          </p>
        </div>

        {vendors.length === 0 ? (
          <p className="muted">No vendors available.</p>
        ) : (
          <div className="grid vendor-grid-modern">
            {/* ID vendor menjadi key unik untuk setiap kad dalam senarai. */}
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  )
}

// Export supaya halaman utama boleh digunakan dalam konfigurasi laluan.
export default HomePage
