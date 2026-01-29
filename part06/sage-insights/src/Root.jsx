import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import QuoteEntry from "./components/QuoteEntry";
import Alert from "./components/Alert";
import quoteAPI from "./api/quotes";
import { useMessageDispatch } from "./context/MessageContext";

const Root = () => {
  const queryClient = useQueryClient();
  const dispatchMessage = useMessageDispatch();

  const updateVoteMutation = useMutation({
    mutationFn: quoteAPI.submitVote,
    onSuccess: (votedQuote) => {
      const quotes = queryClient.getQueryData(["quotes"]);
      queryClient.setQueryData(
        ["quotes"],
        quotes.map((quote) =>
          quote.id === votedQuote.id ? votedQuote : quote,
        ),
      );
      const messageId = Math.floor(Math.random() * 1000000);
      dispatchMessage({ text: `You liked "${votedQuote.text}"`, messageId });
    },
  });

  const handleQuoteVote = (quote) => {
    updateVoteMutation.mutate({ ...quote, likes: quote.likes + 1 });
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["quotes"],
    queryFn: quoteAPI.fetchAll,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>fetching wisdom...</div>;
  }

  if (isError) {
    return <div>service unavailable - please try again later</div>;
  }

  return (
    <div>
      <h3>Wisdom Vault</h3>

      <Alert />
      <QuoteEntry />

      {data.map((quote) => (
        <div key={quote.id}>
          <div>{quote.text}</div>
          <div>
            appreciated by {quote.likes}
            <button onClick={() => handleQuoteVote(quote)}>endorse</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Root;
