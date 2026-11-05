
// useCart menyediakan sejarah pesanan yang dikongsi oleh aplikasi.
import { useCart } from '../hooks/useCart.js'

// Halaman ini memaparkan semua pesanan yang telah dibuat pengguna.
function OrdersPage() {
  // Ambil senarai pesanan daripada context troli.
  const { orders } = useCart()

  // Paparkan senarai pesanan atau mesej jika belum ada pesanan.
  return (
    <section className="orders-page">
      <h2>My Orders</h2>

      {/* Tentukan kandungan berdasarkan sama ada pengguna sudah membuat pesanan. */}
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            // ID pesanan mengenal pasti kad pesanan secara unik.
            <article key={order.id} className="card order-card">
              <h3>Order {order.id}</h3>

              {/* Paparkan butiran checkout dan jumlah pesanan. */}
              <div className="order-details">
                <p>Name: {order.name}</p>
                <p>Mahallah: {order.mahallah}</p>
                <p>Pickup time: {order.pickupTime}</p>
                <p className="order-total">
                  Total: RM {Number(order.total).toFixed(2)}
                </p>
              </div>

              {/* Paparkan nama dan kuantiti setiap produk dalam pesanan. */}
              <div className="order-items">
                <h4>Items</h4>
                <ul>
                  {order.items.map((line) => (
                    <li key={line.item.id}>
                      {line.item.name} × {line.qty}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

// Export supaya halaman pesanan boleh digunakan dalam konfigurasi laluan.
export default OrdersPage
