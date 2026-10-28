
import { Link } from 'react-router'

function VendorCard({ vendor }) {
  return (
    <Link
      to={`/vendor/${vendor.id}`}
      className="vendor-card card"
    >
      <h3>{vendor.name}</h3>
      <p>{vendor.location}</p>
      <p className="muted">{vendor.openHours}</p>

      <span className={vendor.isOpen ? 'open' : 'closed'}>
        {vendor.isOpen ? 'Open' : 'Closed'}
      </span>
    </Link>
  )
}

export default VendorCard
