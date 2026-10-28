
import { useMemo } from 'react'
import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  function addToCart(item) {
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (line) => line.item.id === item.id
      )

      if (existingItem) {
        return previousCart.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [...previousCart, { item, qty: 1 }]
    })
  }

  function changeQty(itemId, delta) {
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

  function removeFromCart(itemId) {
    setCart((previousCart) =>
      previousCart.filter((line) => line.item.id !== itemId)
    )
  }

  function placeOrder(details) {
    const order = {
      id: `order-${Date.now()}`,
      items: cart,
      total: cart.reduce(
        (sum, line) => sum + line.item.price * line.qty,
        0
      ),
      ...details,
      placedAt: new Date().toISOString(),
    }

    setOrders((previousOrders) => [...previousOrders, order])
    setCart([])

    return order
  }

  const count = cart.reduce((sum, line) => sum + line.qty, 0)

  const total = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0
  )

   const contextValue = useMemo(
    () => ({
      cart,
      orders,
      count,
      total,
      addToCart,
      changeQty,
      removeFromCart,
      placeOrder,
    }),
    [
      cart,
      orders,
      count,
      total,
      addToCart,
      changeQty,
      removeFromCart,
      placeOrder,
    ]
  )

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}
