const Alert = ({ alert }) => {
  if (alert === null) {
    return null;
  }

  return <div className={`alert ${alert.type}`}>{alert.message}</div>;
};

export default Alert;
