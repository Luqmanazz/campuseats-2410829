
// useState menyimpan teks carian yang ditaip pengguna.
import { useState } from 'react'
// useParams membaca ID vendor daripada URL semasa.
import { useParams } from 'react-router'
// Hook untuk memuatkan senarai vendor.
import { useVendors } from '../hooks/useVendors.js'
// Hook untuk menambah produk ke troli.
import { useCart } from '../hooks/useCart.js'
// Hook untuk merekod produk yang baru dilihat.
import { useRecentlyViewed } from '../hooks/useRecentlyViewed.js'
// Komponen yang memaparkan kad menu vendor.
import MenuList from '../components/MenuList.jsx'
// Komponen status pemuatan dan ralat.
import { Loading, ErrorMessage } from '../components/Status.jsx'

// Halaman ini menunjukkan menu vendor dan membolehkan pengguna mencari item.
function VendorPage() {
  // Ambil ID vendor daripada parameter laluan, seperti /vendor/123.
  const { id } = useParams()
  // Muatkan vendor dan status permintaannya.
  const { vendors, loading, error, reload } = useVendors()
  // Dapatkan fungsi untuk menambah produk ke troli.
  const { addToCart } = useCart()
  // Dapatkan fungsi untuk merekod produk yang dilihat.
  const { addRecentlyViewed } = useRecentlyViewed()

  // Simpan teks carian semasa.
  const [searchTerm, setSearchTerm] = useState('')

  // Paparkan status sementara data vendor sedang dimuatkan.
  if (loading) {
    return <Loading />
  }

  // Paparkan mesej ralat dan fungsi cuba semula jika permintaan gagal.
  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />
  }

  // Cari vendor yang ID-nya sepadan dengan parameter URL.
  const vendor = vendors.find(
    (item) => String(item.id) === id
  )

  // Paparkan mesej jika ID dalam URL tidak sepadan dengan vendor yang wujud.
  if (!vendor) {
    return (
      <section>
        <h2>Vendor not found</h2>
        <p>The vendor you are looking for does not exist.</p>
      </section>
    )
  }

  // Gunakan senarai kosong jika vendor belum mempunyai menu.
  const menuItems = vendor.menu ?? []

  // Tapis item berdasarkan nama, penerangan atau kategori.
  const filteredItems = menuItems.filter((item) => {
    // Abaikan ruang di hujung dan perbezaan huruf besar atau kecil dalam carian.
    const keyword = searchTerm.trim().toLowerCase()

    return (
      item.name?.toLowerCase().includes(keyword) ||
      item.description?.toLowerCase().includes(keyword) ||
      item.category?.toLowerCase().includes(keyword)
    )
  })

  // Simpan item yang dilihat bersama maklumat vendor asalnya.
  function handleViewItem(item) {
    addRecentlyViewed(item, vendor.id, vendor.name)
  }

  // Paparkan maklumat vendor, medan carian, dan senarai menu yang telah ditapis.
  return (
    <section>
      <h2>{vendor.name}</h2>
      <p>{vendor.location}</p>
      <p className="muted">{vendor.openHours}</p>

      {/* Kawalan carian menu serta bilangan item yang sepadan. */}
        <div className="menu-search">
        <label htmlFor="menu-search">Find your favourite food</label>

        {/* Nilai input dipautkan kepada state dan dikemas kini apabila pengguna menaip. */}
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

      {/* Hantar item yang telah ditapis dan fungsi tindakan kepada senarai menu. */}
      <MenuList
        items={filteredItems}
        onAdd={addToCart}
        onView={handleViewItem}
      />
    </section>
  )
}

// Export supaya halaman vendor boleh digunakan dalam konfigurasi laluan.
export default VendorPage
