
// Komponen ini memaparkan satu baris produk dalam troli.
// Props diterima daripada komponen induk; fungsi perubahan kuantiti dan buang juga ditentukan di sana.
function CartItem({ line, onChangeQty, onRemove }) {
  // Pecahkan maklumat produk dan kuantiti daripada objek baris troli.
  const { item, qty } = line

  return (
    // Setiap produk troli dipaparkan sebagai satu item senarai.
    <li className="cart-line">
      <div>
        {/* Paparkan nama produk dan harga seunit. */}
        <p className="cart-name">{item.name}</p>
        <p className="muted">
          {/* Tukar harga kepada nombor dan paparkan dengan dua tempat perpuluhan. */}
          RM {Number(item.price).toFixed(2)} each
        </p>
      </div>

      {/* Kawalan untuk mengurangkan atau menambah kuantiti produk. */}
      <div className="qty">
        <button
          type="button"
          // Label ini membantu pembaca skrin menerangkan tindakan butang dengan jelas.
          aria-label={`Decrease ${item.name} quantity`}
          // Hantar ID produk dan perubahan -1 kepada komponen induk.
          onClick={() => onChangeQty(item.id, -1)}
        >
          −
        </button>

        {/* Paparkan kuantiti semasa. */}
        <span>{qty}</span>

        <button
          type="button"
          aria-label={`Increase ${item.name} quantity`}
          // Hantar ID produk dan perubahan +1 kepada komponen induk.
          onClick={() => onChangeQty(item.id, 1)}
        >
          +
        </button>
      </div>

      {/* Kira jumlah baris: harga seunit didarab dengan kuantiti. */}
      <p className="line-total">
        RM {(Number(item.price) * qty).toFixed(2)}
      </p>

      {/* Butang ini meminta komponen induk membuang produk daripada troli. */}
      <button
        type="button"
        className="link danger"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </li>
  )
}

// Export supaya komponen ini boleh digunakan dalam fail lain.
export default CartItem
