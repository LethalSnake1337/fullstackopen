import { configureStore } from '@reduxjs/toolkit'
import alertsSlice from './slices/alertsSlice'
import articlesSlice from './slices/articlesSlice'
import sessionSlice from './slices/sessionSlice'
import profilesSlice from './slices/profilesSlice'

const store = configureStore({
  reducer: {
    alerts: alertsSlice,
    articles: articlesSlice,
    session: sessionSlice,
    profiles: profilesSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
