import axios from "axios";

const fetchAll = async () => {
  const response = await axios.get("http://localhost:3001/anecdotes");
  return response.data;
};

const addNew = async (quote) => {
  const response = await axios.post("http://localhost:3001/anecdotes", quote);
  return response.data;
};

const submitVote = async (quote) => {
  const response = await axios.put(
    `http://localhost:3001/anecdotes/${quote.id}`,
    quote,
  );
  return response.data;
};

const quoteAPI = {
  fetchAll,
  addNew,
  submitVote,
};

export default quoteAPI;
