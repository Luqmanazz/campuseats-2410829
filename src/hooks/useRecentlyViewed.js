
// Gunakan hook simpanan semula guna untuk mengekalkan senarai produk yang dilihat.
import { useLocalStorage } from './useLocalStorage.js'

// Hook ini mengurus senarai produk yang baru-baru ini dilihat pengguna.
export function useRecentlyViewed() {
  // Simpan senarai dalam localStorage supaya ia kekal selepas halaman dimuat semula.
  const [recentItems, setRecentItems] = useLocalStorage(
    'campuseats-recently-viewed',
    []
  )

  // Tambah produk ke senarai dengan maklumat vendor yang berkaitan.
  function addRecentlyViewed(item, vendorId, vendorName) {
    // Gabungkan butiran produk dengan ID dan nama vendornya.
    const entry = {
      ...item,
      vendorId,
      vendorName,
    }

    // Letakkan produk terbaharu di hadapan, buang salinan lama, dan simpan maksimum lima.
    setRecentItems((previousItems) => [
      entry,
      ...previousItems.filter(
        (previousItem) => previousItem.id !== item.id
      ),
    ].slice(0, 5))
  }

  // Kosongkan keseluruhan senarai produk yang pernah dilihat.
  function clearRecentlyViewed() {
    setRecentItems([])
  }

  // Sediakan senarai dan fungsi untuk digunakan oleh komponen pemanggil.
  return {
    recentItems,
    addRecentlyViewed,
    clearRecentlyViewed,
  }
}
