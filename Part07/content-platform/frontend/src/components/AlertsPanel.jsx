import { useSelector, useDispatch } from 'react-redux'
import { hideNotice } from '../slices/alertsSlice'

const AlertsPanel = () => {
  const alerts = useSelector((state) => state.alerts)
  const dispatch = useDispatch()

  if (alerts.length === 0) return null

  return (
    <div style={{ padding: '10px' }}>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          style={{
            padding: '10px',
            margin: '5px 0',
            background: '#fdd',
            border: '1px solid red',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{alert.message}</span>
          <button onClick={() => dispatch(hideNotice(alert.id))}>✕</button>
        </div>
      ))}
    </div>
  )
}

export default AlertsPanel
