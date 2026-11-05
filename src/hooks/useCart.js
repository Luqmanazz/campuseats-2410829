
// useContext membolehkan hook ini membaca nilai yang dikongsi oleh CartProvider.
import { useContext } from 'react'
// Import context yang menyimpan data serta fungsi pengurusan troli.
import { CartContext } from '../context/cart-context.js'

// Hook khas untuk mendapatkan data dan tindakan troli daripada context.
export function useCart() {
  // Baca nilai context semasa daripada provider terdekat.
  const context = useContext(CartContext)

  // Beri ralat yang jelas jika hook digunakan di luar CartProvider.
  if (context === null) {
    throw new Error('useCart must be used within a CartProvider')
  }

  // Pulangkan data dan fungsi troli kepada komponen yang menggunakan hook ini.
  return context
}
