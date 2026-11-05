
// Import komponen yang memaparkan produk troli dan borang pembayaran.
import CartItem from './CartItem.jsx'
import CheckoutForm from './CheckoutForm.jsx'

// Paparkan troli dan borang pembayaran; data serta fungsi tindakan diterima daripada komponen induk.
function CartPage({ cart, onChangeQty, onRemove, onPlaceOrder }) {
  // Jika tiada produk, paparkan mesej kosong dan hentikan pemaparan halaman troli.
  if (cart.length === 0) {
    return (
      <section className="card">
        <h2>Your cart</h2>
        <p className="muted">
          Your cart is empty. Pick something from a menu first.
        </p>
      </section>
    )
  }

  // Jumlahkan harga setiap produk selepas didarab dengan kuantitinya.
  const total = cart.reduce(
    (sum, line) => sum + Number(line.item.price) * line.qty,
    0
  )

  return (
    // Susun senarai troli dan borang pembayaran dalam satu tata letak.
    <div className="cart-layout">
      <section className="card">
        <h2>Your cart</h2>

        {/* Bina satu komponen CartItem untuk setiap baris dalam troli. */}
        <ul className="cart-list">
          {cart.map((line) => (
            <CartItem
              // ID produk menjadi key unik supaya React dapat mengesan perubahan senarai.
              key={line.item.id}
              // Hantar butiran produk serta fungsi tindakan kepada komponen CartItem.
              line={line}
              onChangeQty={onChangeQty}
              onRemove={onRemove}
            />
          ))}
        </ul>

        {/* Paparkan jumlah keseluruhan dengan dua tempat perpuluhan. */}
        <p className="cart-total">
          Total: RM {total.toFixed(2)}
        </p>
      </section>

      {/* Hantar fungsi membuat pesanan kepada borang pembayaran. */}
      <CheckoutForm onPlaceOrder={onPlaceOrder} />
    </div>
  )
}

// Export supaya halaman troli boleh digunakan dalam fail lain.
export default CartPage
