
// Komponen ini memaparkan maklumat satu produk menu dan tindakan yang tersedia.
function MenuItemCard({
  item,
  onAdd,
  onView,
  // Jika tiada nilai diberikan, anggap produk boleh ditambah ke troli.
  disabled = false,
}) {
  // Paparkan butiran produk dan kawalan untuk menambahkannya ke troli.
  return (
    <article className="menu-card card">
      <div>
        {/* Klik pada nama produk memanggil onView jika fungsi itu diberikan. */}
        <h3
          onClick={() => onView?.(item)}
          title="Click to add to Recently Viewed"
          style={{ cursor: 'pointer' }}
        >
          {item.name}
        </h3>

        {/* Paparkan penerangan hanya jika produk mempunyai penerangan. */}
        {item.description && <p>{item.description}</p>}

        {/* Paparkan kategori hanya jika maklumat kategori tersedia. */}
        {item.category && (
          <p className="muted">Category: {item.category}</p>
        )}

        {/* Tanda produk sebagai Popular apabila nilai popular benar. */}
        {item.popular && <span className="popular">Popular</span>}
      </div>
      {/* Bahagian bawah kad memaparkan harga dan butang tindakan. */}
      <div className="menu-card-bottom">
        {/* Tukar harga kepada nombor dan paparkan dengan dua tempat perpuluhan. */}
        <strong>RM {Number(item.price).toFixed(2)}</strong>

        {/* Butang memanggil onAdd dengan produk ini apabila ditekan. */}
        {/* Status disabled menentukan sama ada butang boleh ditekan. */}
        <button
          type="button"
          className="btn"
          disabled={disabled}
          onClick={() => onAdd(item)}
        >
          {/* Tukar label butang mengikut status ketersediaan produk. */}
          {disabled ? 'Unavailable' : 'Add to cart'}
        </button>
      </div>
    </article>
  )
}

// Export supaya kad ini boleh digunakan dalam senarai menu.
export default MenuItemCard
