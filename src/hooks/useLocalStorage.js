export function saveToLocalStorage (key, value) {
  const now = new Date()
  const item = {
    value,
    expiry: now.getTime() + 86400000
  }
  window.localStorage.setItem(key, JSON.stringify(item))
}

export function getFromLocalStorage (key) {
  const itemStorage = window.localStorage.getItem(key)
  if (!itemStorage) {
    return null
  }

  const item = JSON.parse(itemStorage)
  const now = new Date()

  if (now.getTime() > item.expiry) {
    window.localStorage.removeItem(key)
    return null
  }
  return item.value
}
