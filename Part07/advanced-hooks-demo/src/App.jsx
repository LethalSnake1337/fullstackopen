import { useState, useEffect } from "react";
import axios from "axios";

const useInput = (fieldType) => {
  const [data, setData] = useState("");

  const handleChange = (evt) => {
    setData(evt.target.value);
  };

  const handleClear = () => {
    setData("");
  };

  return {
    type: fieldType,
    value: data,
    onChange: handleChange,
    onSubmit: handleClear,
  };
};

const useDataCollection = (endpoint) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      loadItems(endpoint);
    } catch (error) {
      console.log(error);
    }
  }, [endpoint]);

  const loadItems = async (endpoint) => {
    const resp = await axios.get(endpoint);
    setItems(resp.data);
  };

  const addItem = async (item) => {
    try {
      const resp = await axios.post(endpoint, item);
      setItems(items.concat(resp.data));
    } catch (error) {
      console.log(error);
    }
  };

  const api = {
    addItem,
  };

  return [items, api];
};

const RootApp = () => {
  const messageInput = useInput("text");
  const personNameInput = useInput("text");
  const phoneInput = useInput("text");

  const [messages, messageApi] = useDataCollection(
    "http://localhost:3005/notes",
  );
  const [contacts, contactApi] = useDataCollection(
    "http://localhost:3005/persons",
  );

  const submitMessage = (event) => {
    event.preventDefault();
    messageApi.addItem({ content: messageInput.value });
    messageInput.onSubmit();
  };

  const submitPerson = (event) => {
    event.preventDefault();
    contactApi.addItem({
      name: personNameInput.value,
      number: phoneInput.value,
    });
    personNameInput.onSubmit();
    phoneInput.onSubmit();
  };

  return (
    <div>
      <h2>messages</h2>
      <form onSubmit={submitMessage}>
        <input {...messageInput} />
        <button>add</button>
      </form>
      {messages.map((m) => (
        <p key={m.id}>{m.content}</p>
      ))}

      <h2>contacts</h2>
      <form onSubmit={submitPerson}>
        name <input {...personNameInput} /> <br />
        phone <input {...phoneInput} />
        <button>add</button>
      </form>
      {contacts.map((c) => (
        <p key={c.id}>
          {c.name} {c.number}
        </p>
      ))}
    </div>
  );
};

export default RootApp;
