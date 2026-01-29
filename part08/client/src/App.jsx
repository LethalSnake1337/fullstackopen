import { useState, useEffect } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client/react";
import AuthorsView from "./components/Authors";
import BooksView from "./components/Books";
import AddBook from "./components/NewBook";
import Suggest from "./components/Recommend";
import LoginPanel from "./components/Login";
import Notice from "./components/Notify";
import { BOOK_ADDED, ME } from "./queries";
import { ERRORCOLOR, INFOCOLOR } from "./const";
import { updateAuthors, updateBooks } from "./cache";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");
  const client = useApolloClient();

  const userResult = useQuery(ME);
  const favoriteGenre = userResult?.data?.me?.favoriteGenre;

  useEffect(() => {
    const saved = localStorage.getItem("book-client-token");
    if (saved) {
      setToken(saved);
    }
  }, []);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      if (!data?.data?.bookAdded) {
        return;
      }
      onNewBook(data.data.bookAdded, client);
    }
  })

  const onNewBook = (book, client) => {
    const author = book.author.name;
    const title = book.title;
    updateBooks(client, book);
    updateAuthors(client, book);
    setInfoMessage(`New book: ${title} — ${author}`);
    setTimeout(() => setInfoMessage(null), 10000);
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem("book-client-token", token);
    setPage("authors");
  }

  const handleLogout = () => {
    setToken("");
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div>
      <Notice message={errorMessage} color={ERRORCOLOR} />
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>Add book</button>
            <button onClick={() => setPage("recommend")}>Suggestions</button>
            <button onClick={handleLogout}>Sign out</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>Sign in</button>
        )}
      </div>
      <AuthorsView show={page === "authors"} setError={notify} />
      <BooksView show={page === "books"} selectedGenre={selectedGenre} handleGenreChange={handleGenreChange} />
      <Suggest show={page === "recommend"} favoriteGenre={favoriteGenre} />
      <AddBook show={page === "add"} setError={notify} />
      <LoginPanel show={page === "login"} setError={notify} handleLogin={handleLogin} />
      <Notice message={infoMessage} color={INFOCOLOR} />
    </div>
  );
};

export default App;
