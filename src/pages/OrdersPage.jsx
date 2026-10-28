
import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  return (
    <section className="orders-page">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <article key={order.id} className="card order-card">
              <h3>Order {order.id}</h3>

              <div className="order-details">
                <p>Name: {order.name}</p>
                <p>Mahallah: {order.mahallah}</p>
                <p>Pickup time: {order.pickupTime}</p>
                <p className="order-total">
                  Total: RM {Number(order.total).toFixed(2)}
                </p>
              </div>

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

export default OrdersPage
