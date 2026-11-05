
// Import hook navigasi supaya pengguna boleh dihantar ke halaman pesanan selepas checkout.
import { useNavigate } from 'react-router'
// useCart menyediakan data troli dan fungsi untuk mengubahnya.
import { useCart } from '../hooks/useCart.js'
// Import komponen bagi setiap item troli dan borang checkout.
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'

// Halaman ini memaparkan troli dan mengurus aliran penghantaran pesanan.
function CartPage() {
  // Ambil state dan fungsi troli daripada context melalui hook.
  const {
    cart,
    total,
    changeQty,
    removeFromCart,
    placeOrder,
  } = useCart()

  // Sediakan fungsi untuk berpindah ke halaman pesanan.
  const navigate = useNavigate()

  // Buat pesanan jika troli mengandungi item, kemudian buka halaman pesanan.
  function handlePlaceOrder(details) {
    // Elakkan pesanan kosong.
    if (cart.length === 0) {
      return
    }

    placeOrder(details)
    navigate('/orders')
  }

  // Paparkan kandungan troli atau mesej jika troli kosong.
  return (
    <section>
      <h2>Your Cart</h2>

      {/* Pilih paparan berdasarkan sama ada troli mempunyai item. */}
      {cart.length === 0 ? (
        <p>Your cart is empty. Add some food first!</p>
      ) : (
        <>
          {/* Paparkan setiap item dan sambungkan kawalan kuantitinya kepada fungsi troli. */}
          <ul className="cart-list">
            {cart.map((line) => (
              <CartItem
                key={line.item.id}
                line={line}
                onChangeQty={changeQty}
                onRemove={removeFromCart}
              />
            ))}
          </ul>

          {/* Paparkan jumlah keseluruhan dan borang untuk membuat pesanan. */}
          <h3>Total: RM {total.toFixed(2)}</h3>

          <CheckoutForm onPlaceOrder={handlePlaceOrder} />
        </>
      )}
    </section>
  )
}

// Export supaya halaman troli boleh digunakan dalam konfigurasi laluan.
export default CartPage
