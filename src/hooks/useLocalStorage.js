
// useState menyimpan nilai dalam React, manakala useEffect menyegerakkannya ke localStorage.
import { useEffect, useState } from 'react'

// Hook ini menyimpan state React dan memulihkannya semula daripada localStorage.
export function useLocalStorage(key, initialValue) {
  // Fungsi initializer hanya membaca localStorage semasa state mula-mula diwujudkan.
  const [value, setValue] = useState(() => {
    try {
      // Dapatkan data tersimpan berdasarkan kunci dan tukar JSON kembali kepada nilai JavaScript.
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch (error) {
      // Jika data gagal dibaca atau JSON tidak sah, catat ralat dan gunakan nilai awal.
      console.error('Failed to read localStorage:', error)
      return initialValue
    }
  })

  // Simpan semula nilai apabila state atau kunci berubah.
  useEffect(() => {
    try {
      // localStorage hanya menerima teks, jadi tukar nilai kepada format JSON.
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      // Catat ralat jika pelayar tidak membenarkan data disimpan.
      console.error('Failed to save to localStorage:', error)
    }
  }, [key, value])

  // Pulangkan bentuk yang sama seperti useState: nilai semasa dan fungsi pengemas kini.
  return [value, setValue]
}