
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
    <section>
      <h2>Today's vendors</h2>

      {vendors.length === 0 ? (
        <p>No vendors available.</p>
      ) : (
        <div className="grid">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}

      <section>
        <h2>Recently Viewed</h2>

        {recentItems.length === 0 ? (
          <p className="muted">
            No recently viewed items yet. Open a vendor and click a menu item name.
          </p>
        ) : (
          <>
            <button
                type="button"
                className="btn"
                onClick={clearRecentlyViewed}
                >
                Clear recently viewed
                </button>

            <ul>
              {recentItems.map((item) => (
                <li key={item.id}>
                  <Link to={`/vendor/${item.vendorId}`}>
                    {item.name}
                  </Link>
                  <span className="muted">
                    {' '}— {item.vendorName} (RM {Number(item.price).toFixed(2)})
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </section>
  )
}

export default HomePage
