
// Import kad yang memaparkan butiran dan tindakan untuk satu produk menu.
import MenuItemCard from './MenuItemCard.jsx'

// Paparkan semua produk menu; fungsi tindakan diterima daripada komponen induk.
function MenuList({ items, onAdd, onView }) {
  // Beri maklum balas apabila senarai produk kosong.
  if (items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>
  }

  // Susun kad produk dalam grid.
  return (
    <div className="grid">
      {/* Setiap produk menjadi kad; produk tidak tersedia akan menyahaktifkan butang tambah. */}
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          onAdd={onAdd}
          onView={onView}
          disabled={item.available === false}
        />
      ))}
    </div>
  )
}

// Export supaya senarai menu boleh digunakan dalam halaman lain.
export default MenuList
