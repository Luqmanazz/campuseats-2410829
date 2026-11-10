
import { useLocalStorage } from './useLocalStorage.js'
import { useAuth } from './useAuth.js'

// Manage recently viewed items separately for each user.
export function useRecentlyViewed() {
  const { user } = useAuth()

  // Each user gets their own localStorage key.
  const storageKey = user?.uid
    ? `ce-recent-${user.uid}`
    : 'ce-recent-guest'

  const [recentItems, setRecentItems] = useLocalStorage(
    storageKey,
    []
  )

  // Add the latest viewed item and keep a maximum of five.
  function addRecentlyViewed(item, vendorId, vendorName) {
    const entry = {
      ...item,
      vendorId,
      vendorName,
    }

    setRecentItems((previousItems) => [
      entry,
      ...previousItems.filter(
        (previousItem) =>
          previousItem.id !== item.id ||
          previousItem.vendorId !== vendorId
      ),
    ].slice(0, 5))
  }

  // Clear the current user's recently viewed items.
  function clearRecentlyViewed() {
    setRecentItems([])
  }

  return {
    recentItems: user ? recentItems : [],
    addRecentlyViewed,
    clearRecentlyViewed,
  }
}
