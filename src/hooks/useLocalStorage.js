
import { useCallback, useEffect, useState } from 'react'

// Read data from localStorage.
function readStorage(key, initialValue) {
  try {
    const saved = localStorage.getItem(key)
    return saved !== null ? JSON.parse(saved) : initialValue
  } catch (error) {
    console.error('Failed to read localStorage:', error)
    return initialValue
  }
}

// Custom hook for storing React state in localStorage.
export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => ({
    key,
    value: readStorage(key, initialValue),
  }))

  // Get the value belonging to the current storage key.
  const value =
    stored.key === key
      ? stored.value
      : readStorage(key, initialValue)

  // Update the state for the current storage key.
  const setValue = useCallback((newValue) => {
    setStored((previous) => {
      const currentValue =
        previous.key === key
          ? previous.value
          : readStorage(key, initialValue)

      const nextValue =
        typeof newValue === 'function'
          ? newValue(currentValue)
          : newValue

      return {
        key,
        value: nextValue,
      }
    })
  }, [key, initialValue])

  // Reload data whenever the storage key changes.
  useEffect(() => {
    if (stored.key !== key) {
      setStored({
        key,
        value: readStorage(key, initialValue),
      })
      return
    }

    // Save the current value to localStorage.
    try {
      localStorage.setItem(key, JSON.stringify(stored.value))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }, [key, stored, initialValue])

  return [value, setValue]
}
