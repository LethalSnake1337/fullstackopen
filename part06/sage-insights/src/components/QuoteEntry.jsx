import { useMutation, useQueryClient } from "@tanstack/react-query";
import quoteAPI from "../api/quotes";
import { useMessageDispatch } from "../context/MessageContext";

const QuoteEntry = () => {
  const queryClient = useQueryClient();
  const dispatchMessage = useMessageDispatch();

  const addQuoteMutation = useMutation({
    mutationFn: quoteAPI.addNew,
    onSuccess: (newQuote) => {
      const quotes = queryClient.getQueryData(["quotes"]);
      queryClient.setQueryData(["quotes"], quotes.concat(newQuote));
      const messageId = Math.floor(Math.random() * 1000000);
      dispatchMessage({ text: `You added "${newQuote.text}"`, messageId });
    },
    onError: (error) => {
      const messageId = Math.floor(Math.random() * 1000000);
      dispatchMessage({ text: error.response.data.error, messageId });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const quoteText = event.target.quoteInput.value;
    event.target.quoteInput.value = "";
    addQuoteMutation.mutate({ text: quoteText, likes: 0 });
  };

  return (
    <div>
      <h3>add wisdom</h3>
      <form onSubmit={handleSubmit}>
        <input name="quoteInput" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default QuoteEntry;
