
function VendorCard({ vendor, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`vendor-card card ${selected ? 'selected' : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <h3>{vendor.name}</h3>
      <p>{vendor.location}</p>
      <p className="muted">{vendor.openHours}</p>
      <span className={vendor.isOpen ? 'open' : 'closed'}>
        {vendor.isOpen ? 'Open' : 'Closed'}
      </span>
    </button>
  )
}

export default VendorCard
