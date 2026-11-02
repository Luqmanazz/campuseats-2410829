
import { Link } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed.js'
import VendorCard from '../components/VendorCard.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function HomePage() {
  const { vendors, loading, error, reload } = useVendors()
  const { recentItems, clearRecentlyViewed } = useRecentlyViewed()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />
  }

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

export default HomePage
