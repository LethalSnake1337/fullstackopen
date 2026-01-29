import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearSession } from '../slices/sessionSlice'
import persistenceService from '../services/persistenceService'
import AlertsPanel from './AlertsPanel'

const MainLayout = ({ children }) => {
  const user = useSelector((state) => state.session)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(clearSession())
    persistenceService.removeSession()
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <AlertsPanel />
      {user && (
        <nav style={{ padding: '15px', background: '#f0f0f0', display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link to="/">Articles</Link>
            <Link to="/people">People</Link>
          </div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span>Logged in as {user.login}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>
      )}
      <main style={{ padding: '20px' }}>
        {children}
      </main>
    </div>
  )
}

export default MainLayout
