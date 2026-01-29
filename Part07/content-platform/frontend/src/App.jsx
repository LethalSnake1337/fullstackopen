import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import ArticlePage from './pages/ArticlePage'
import ArticlesPage from './pages/ArticlesPage'
import SessionPage from './pages/SessionPage'
import ProfilePage from './pages/ProfilePage'
import ProfilesPage from './pages/ProfilesPage'
import articlesApi from './services/articlesApi'
import persistenceService from './services/persistenceService'
import { loadAll } from './slices/articlesSlice'
import { fetchAll } from './slices/profilesSlice'
import { setSession } from './slices/sessionSlice'
import MainLayout from './components/MainLayout'

const RootComponent = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.session)

  useEffect(() => {
    if (currentUser) {
      dispatch(loadAll())
      dispatch(fetchAll())
    }
  }, [currentUser, dispatch])

  useEffect(() => {
    const stored = persistenceService.retrieveSession()
    if (stored) {
      articlesApi.setup(stored.token)
      dispatch(setSession(stored))
    }
  }, [dispatch])

  if (!currentUser) {
    return (
      <MainLayout>
        <Routes>
          <Route path="/" element={<SessionPage />} />
        </Routes>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
        <Route path="people" element={<ProfilesPage />} />
        <Route path="people/:id" element={<ProfilePage />} />
        <Route path="/*" element={<h3>404 Not Found</h3>} />
      </Routes>
    </MainLayout>
  )
}

export default RootComponent
