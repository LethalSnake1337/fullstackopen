import { createContext, useReducer, useContext } from "react";

const messageReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return state.concat({
        text: action.payload.text,
        messageId: action.payload.messageId,
      });
    case "CLEAR":
      return state.filter((msg) => msg.messageId !== action.payload.messageId);
    default:
      return state;
  }
};

const MessageContext = createContext();

export const MessageProviderWrapper = (props) => {
  const [messages, messagesDispatch] = useReducer(messageReducer, []);

  return (
    <MessageContext.Provider value={[messages, messagesDispatch]}>
      {props.children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const messagesAndDispatch = useContext(MessageContext);
  return messagesAndDispatch[0];
};

export const useMessageDispatch = () => {
  const messagesAndDispatch = useContext(MessageContext);
  const dispatch = messagesAndDispatch[1];
  return (payload) => {
    dispatch({ type: "CREATE", payload });
    setTimeout(() => {
      dispatch({ type: "CLEAR", payload });
    }, 5000);
  };
};

export default MessageContext;
