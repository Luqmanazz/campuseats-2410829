
import { useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'

function CartPage() {
  const {
    cart,
    total,
    changeQty,
    removeFromCart,
    placeOrder,
  } = useCart()

  const navigate = useNavigate()

  function handlePlaceOrder(details) {
    if (cart.length === 0) {
      return
    }

    placeOrder(details)
    navigate('/orders')
  }

  return (
    <section>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. Add some food first!</p>
      ) : (
        <>
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

          <h3>Total: RM {total.toFixed(2)}</h3>

          <CheckoutForm onPlaceOrder={handlePlaceOrder} />
        </>
      )}
    </section>
  )
}

export default CartPage
