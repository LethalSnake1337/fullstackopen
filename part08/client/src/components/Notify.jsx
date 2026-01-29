const Notify = ({ message, color }) => {
  if (!message) return null
  const style = { color, border: `1px solid ${color}`, padding: 8, margin: 8 }
  return <div style={style}>{message}</div>
}

export default Notify
