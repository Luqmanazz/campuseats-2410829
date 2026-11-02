
import { Link } from 'react-router'

function VendorCard({ vendor }) {
  return (
    <Link
      to={`/vendor/${vendor.id}`}
      className="vendor-card-modern"
    >
      <div className="vendor-card-top">
        <div className="vendor-icon" aria-hidden="true">
          <span>▣</span>
        </div>

        <h3>{vendor.name}</h3>

        <span
          className={`status ${vendor.isOpen ? 'open' : 'closed'}`}
        >
          {vendor.isOpen ? 'Open' : 'Closed'}
        </span>
      </div>

      <div className="vendor-card-details">
        <p>
          <span aria-hidden="true">⌖</span>
          {vendor.location}
        </p>

        <p>
          <span aria-hidden="true">◷</span>
          {vendor.openHours}
        </p>
      </div>
    </Link>
  )
}

export default VendorCard
