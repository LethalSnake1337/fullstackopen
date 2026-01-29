const STORAGE_KEY = 'currentSession'

const saveSession = (session) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

const retrieveSession = () => {
  const item = localStorage.getItem(STORAGE_KEY)
  return item ? JSON.parse(item) : null
}

const removeSession = () => {
  localStorage.removeItem(STORAGE_KEY)
}

export default {
  saveSession,
  retrieveSession,
  removeSession
}
