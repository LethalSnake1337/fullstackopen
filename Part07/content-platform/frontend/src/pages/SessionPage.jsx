import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSession } from '../slices/sessionSlice'
import { addAlert } from '../slices/alertsSlice'
import authService from '../services/authService'
import articlesApi from '../services/articlesApi'
import persistenceService from '../services/persistenceService'

const SessionPage = () => {
  const [loginVal, setLoginVal] = useState('')
  const [passVal, setPassVal] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await authService.authenticate(loginVal, passVal)
      dispatch(setSession(result))
      persistenceService.saveSession(result)
      articlesApi.setup(result.token)
    } catch (error) {
      dispatch(addAlert('Authentication failed', 3))
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Username"
            value={loginVal}
            onChange={(e) => setLoginVal(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Password"
            value={passVal}
            onChange={(e) => setPassVal(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SessionPage
