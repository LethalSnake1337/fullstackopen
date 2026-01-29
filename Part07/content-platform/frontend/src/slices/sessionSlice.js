import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action) => action.payload,
    clearSession: () => null
  }
})

export const { setSession, clearSession } = sessionSlice.actions
export default sessionSlice.reducer
