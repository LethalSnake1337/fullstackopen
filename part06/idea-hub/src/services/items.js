import axios from "axios";

const getAll = async () => {
  const response = await axios.get("http://localhost:3001/anecdotes");
  return response.data;
};

const post = async (item) => {
  const response = await axios.post("http://localhost:3001/anecdotes", item);
  return response.data;
};

const updateCount = async (item) => {
  const response = await axios.put(
    `http://localhost:3001/anecdotes/${item.id}`,
    item,
  );
  return response.data;
};

const itemService = {
  getAll,
  post,
  updateCount,
};

export default itemService;
