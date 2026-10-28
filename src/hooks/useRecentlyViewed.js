
import { useLocalStorage } from './useLocalStorage.js'

export function useRecentlyViewed() {
  const [recentItems, setRecentItems] = useLocalStorage(
    'campuseats-recently-viewed',
    []
  )

  function addRecentlyViewed(item, vendorId, vendorName) {
    const entry = {
      ...item,
      vendorId,
      vendorName,
    }

    setRecentItems((previousItems) => [
      entry,
      ...previousItems.filter(
        (previousItem) => previousItem.id !== item.id
      ),
    ].slice(0, 5))
  }

  function clearRecentlyViewed() {
    setRecentItems([])
  }

  return {
    recentItems,
    addRecentlyViewed,
    clearRecentlyViewed,
  }
}

