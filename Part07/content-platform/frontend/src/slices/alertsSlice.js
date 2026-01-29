import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    showNotice: (state, action) => {
      const id = Math.random()
      state.push({ id, ...action.payload })
    },
    hideNotice: (state, action) => {
      return state.filter(n => n.id !== action.payload)
    }
  }
})

export const { showNotice, hideNotice } = alertsSlice.actions

export const addAlert = (msg, duration = 5) => (dispatch) => {
  const id = Math.random()
  dispatch(showNotice({ message: msg, id }))
  setTimeout(() => {
    dispatch(hideNotice(id))
  }, duration * 1000)
}

export default alertsSlice.reducer
