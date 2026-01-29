import { useSelector } from "react-redux";

const Toast = () => {
  const alerts = useSelector((state) => state.toast);

  const panelStyle = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div style={panelStyle}>
      {alerts.map((alert) => (
        <div key={alert.id}>{alert.text}</div>
      ))}
    </div>
  );
};

export default Toast;
