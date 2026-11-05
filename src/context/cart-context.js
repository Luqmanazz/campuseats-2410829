
// createContext membolehkan data troli dikongsi antara komponen tanpa menghantar props berulang kali.
import { createContext } from 'react'

// Nilai awal null menandakan provider belum membekalkan data context.
export const CartContext = createContext(null)
