
// useMemo membantu mengekalkan objek nilai context sehingga kebergantungannya berubah.
import { useMemo } from 'react'
// Import context yang akan membekalkan data dan fungsi troli kepada komponen anak.
import { CartContext } from './cart-context.js'
// Hook ini menyimpan state dalam localStorage supaya data kekal selepas muat semula.
import { useLocalStorage } from '../hooks/useLocalStorage.js'

// Provider mengurus state troli dan pesanan, kemudian berkongsi kedua-duanya melalui context.
export function CartProvider({ children }) {
  // Baca atau simpan senarai troli menggunakan kunci khusus dalam localStorage.
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  // Baca atau simpan sejarah pesanan dengan kunci localStorage yang berasingan.
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  // Tambah produk ke troli; jika sudah ada, naikkan kuantitinya.
  function addToCart(item) {
    // Gunakan state terkini supaya kemas kini troli tidak bergantung pada nilai lama.
    setCart((previousCart) => {
      // Cari baris troli yang mempunyai ID produk yang sama.
      const existingItem = previousCart.find(
        (line) => line.item.id === item.id
      )

      // Jika produk sudah ada, pulangkan senarai baharu dengan kuantiti ditambah satu.
      if (existingItem) {
        return previousCart.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      // Jika produk belum ada, tambahkannya dengan kuantiti permulaan satu.
      return [...previousCart, { item, qty: 1 }]
    })
  }

  // Ubah kuantiti produk mengikut delta, contohnya +1 atau -1.
  function changeQty(itemId, delta) {
    // Kemas kini baris yang sepadan dan buang item jika kuantitinya menjadi sifar.
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

  // Buang produk yang ID-nya sepadan daripada troli.
  function removeFromCart(itemId) {
    setCart((previousCart) =>
      previousCart.filter((line) => line.item.id !== itemId)
    )
  }

  // Bentuk pesanan daripada troli dan butiran checkout yang diberikan.
  function placeOrder(details) {
    // Simpan ID unik, salinan item troli, jumlah, butiran pengguna, dan masa pesanan dibuat.
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

    // Tambah pesanan baharu ke sejarah pesanan sedia ada.
    setOrders((previousOrders) => [...previousOrders, order])
    // Kosongkan troli selepas pesanan berjaya dibentuk.
    setCart([])

    // Pulangkan pesanan supaya pemanggil boleh menggunakannya jika perlu.
    return order
  }

  // Kira jumlah unit produk dalam troli untuk lencana bilangan item.
  const count = cart.reduce((sum, line) => sum + line.qty, 0)

  // Kira nilai keseluruhan troli berdasarkan harga dan kuantiti setiap produk.
  const total = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0
  )

  // Sediakan semua data dan fungsi troli dalam satu nilai untuk context.
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

  // Paparkan semua komponen anak di dalam provider supaya mereka boleh mengakses context.
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}
