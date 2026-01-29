import { useMessages } from "../context/MessageContext";

const Alert = () => {
  const messages = useMessages();

  const containerStyle = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (messages.length === 0) return null;

  return (
    <div style={containerStyle}>
      {messages.map((msg) => (
        <div key={msg.messageId}>{msg.text}</div>
      ))}
    </div>
  );
};

export default Alert;
