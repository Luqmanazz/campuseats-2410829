
import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuItemCard from './components/MenuItemCard.jsx'
import Status, { Loading, ErrorMessage } from './components/Status.jsx'
import CartPage from './components/CartPage.jsx'


function App() {
  const [vendors, setVendors] = useState([])
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu')
  const [lastOrder, setLastOrder] = useState(null)

  // Week 3 personal feature: controlled menu search.
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadVendors() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/vendors.json', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Vendor data must be an array.')
        }

        setVendors(data)

        setSelectedVendorId((currentId) => {
          if (data.some((vendor) => vendor.id === currentId)) {
            return currentId
          }

          return data[0]?.id ?? null
        })
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load vendors.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadVendors()

    return () => controller.abort()
  }, [reloadKey])

  const cartCount = cart.reduce(
    (sum, line) => sum + line.qty,
    0
  )

  const cartTotal = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0
  )

  const selectedVendor = vendors.find(
    (vendor) => vendor.id === selectedVendorId
  )

  const visibleMenu = (selectedVendor?.menu ?? []).filter((item) =>
    item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  )

  function handleAddToCart(item) {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (line) => line.item.id === item.id
      )

      if (existing) {
        return previousCart.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [...previousCart, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((previousCart) =>
      previousCart
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function handleRemove(itemId) {
    setCart((previousCart) =>
      previousCart.filter((line) => line.item.id !== itemId)
    )
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce(
      (sum, line) => sum + line.item.price * line.qty,
      0
    )

    setLastOrder({
      ...details,
      total,
      items: cart,
    })

    setCart([])
    setSearchQuery('')
    setView('done')
  }

  let content

  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done') {
    content = lastOrder ? (
      <section className="card order-success">
        <h2>Order placed successfully!</h2>
        <p>Thank you, {lastOrder.name}.</p>
        <p>Mahallah: {lastOrder.mahallah}</p>
        <p>Pickup time: {lastOrder.pickupTime}</p>

        <h3>Order summary</h3>
        <ul>
          {lastOrder.items.map((line) => (
            <li key={line.item.id}>
              {line.item.name} × {line.qty}
            </li>
          ))}
        </ul>

        <p className="cart-total">
          Total: RM {lastOrder.total.toFixed(2)}
        </p>

        <button
          type="button"
          className="btn"
          onClick={() => setView('menu')}
        >
          Back to vendors
        </button>
      </section>
    ) : (
      <p>No order to display.</p>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((key) => key + 1)}
      />
    )
  } else {
    content = (
      <div className="menu-page">
        <section>
          <h2>Our Vendors</h2>

          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                selected={vendor.id === selectedVendorId}
                onSelect={() => {
                  setSelectedVendorId(vendor.id)
                  setSearchQuery('')
                }}
              />
            ))}
          </div>
        </section>

        {selectedVendor && (
          <section className="menu-section">
            <h2>{selectedVendor.name}</h2>
            <p className="muted">{selectedVendor.location}</p>
            <p className="muted">
              Opening hours: {selectedVendor.openHours}
            </p>

            {!selectedVendor.isOpen && (
              <p className="field-error">This vendor is currently closed.</p>
            )}

            <label htmlFor="menu-search">Search menu</label>
            <input
              id="menu-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search food by name..."
            />

            <p className="muted">
              {visibleMenu.length} menu item(s) found
            </p>

            <div className="menu-grid">
              {visibleMenu.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onAdd={handleAddToCart}
                  disabled={!selectedVendor.isOpen || item.available === false}
                />
              ))}
            </div>

            {visibleMenu.length === 0 && (
              <p className="muted">No matching menu items found.</p>
            )}
          </section>
        )}
      </div>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />

      <main className="container">
        {content}
      </main>

      <Footer />
    </>
  )
}

export default App
