
import { useState } from 'react'
import { useParams } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useCart } from '../hooks/useCart.js'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()
  const { addToCart } = useCart()
  const { addRecentlyViewed } = useRecentlyViewed()

  const [searchTerm, setSearchTerm] = useState('')

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />
  }

  const vendor = vendors.find(
    (item) => String(item.id) === id
  )

  if (!vendor) {
    return (
      <section>
        <h2>Vendor not found</h2>
        <p>The vendor you are looking for does not exist.</p>
      </section>
    )
  }

  const menuItems = vendor.menu ?? []

  const filteredItems = menuItems.filter((item) => {
    const keyword = searchTerm.trim().toLowerCase()

    return (
      item.name?.toLowerCase().includes(keyword) ||
      item.description?.toLowerCase().includes(keyword) ||
      item.category?.toLowerCase().includes(keyword)
    )
  })

  function handleViewItem(item) {
    addRecentlyViewed(item, vendor.id, vendor.name)
  }

  return (
    <section>
      <h2>{vendor.name}</h2>
      <p>{vendor.location}</p>
      <p className="muted">{vendor.openHours}</p>

      
        <div className="menu-search">
        <label htmlFor="menu-search">Find your favourite food</label>

        <input
            id="menu-search"
            type="search"
            className="search-input"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
        />

        <p className="muted search-count">
            Showing {filteredItems.length} of {menuItems.length} menu items
        </p>
        </div>

      <MenuList
        items={filteredItems}
        onAdd={addToCart}
        onView={handleViewItem}
      />
    </section>
  )
}

export default VendorPage
