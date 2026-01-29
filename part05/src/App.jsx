import { useState, useEffect, useRef } from "react";
import ArticleGrid from "./ui/sections/ArticleGrid";
import ArticleSubmissionForm from "./ui/sections/ArticleSubmissionForm";
import Alert from "./ui/common/Alert";
import SignInPage from "./ui/views/SignInPage";
import CollapsibleSection from "./ui/common/CollapsibleSection";
import ArticleRepository from "./adapters/ArticleRepository";
import AuthenticationService from "./adapters/AuthenticationService";
import {
  sortByRank,
  parseStorageData,
  persistData,
  clearStorageData,
} from "./utils/storage";
import { useNotification, useErrorHandler } from "./hooks/useNotification";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, showNotification, dismissNotification] =
    useNotification();

  const submissionFormRef = useRef();
  const handleError = useErrorHandler(showNotification);

  // Initialize: Load articles and restore session
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const fetchedArticles = await ArticleRepository.fetchAll();
        setArticles(sortByRank(fetchedArticles));
      } catch (error) {
        handleError(error);
      }
    };

    const restoreUserSession = () => {
      const sessionData = parseStorageData("currentUserSession");
      if (sessionData) {
        ArticleRepository.setAuthToken(sessionData.token);
        setCurrentUser(sessionData);
      }
    };

    loadArticles();
    restoreUserSession();
  }, [handleError]);

  const handleSignIn = async (credentials) => {
    try {
      const user = await AuthenticationService.authenticate(credentials);
      persistData("currentUserSession", user);
      ArticleRepository.setAuthToken(user.token);
      setCurrentUser(user);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const handleSignOut = () => {
    clearStorageData("currentUserSession");
    setCurrentUser(null);
    ArticleRepository.setAuthToken(null);
  };

  const handleCreateArticle = async (articleData) => {
    try {
      const createdArticle = await ArticleRepository.createArticle(articleData);
      setArticles(articles.concat(createdArticle));
      showNotification(
        `New article "${createdArticle.title}" by ${createdArticle.author} added`,
        "success",
      );
      submissionFormRef.current?.toggle();
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const handleIncreaseLikes = async (article) => {
    const { id, title, author, url, likes } = article;
    try {
      const updatedArticle = await ArticleRepository.modifyArticle({
        id,
        title,
        author,
        url,
        likes: likes + 1,
      });
      setArticles(
        sortByRank(
          articles.map((a) =>
            a.id === updatedArticle.id ? updatedArticle : a,
          ),
        ),
      );
    } catch (error) {
      handleError(error);
    }
  };

  const handleDeleteArticle = async ({ id, title, author }) => {
    try {
      await ArticleRepository.deleteArticle(id);
      setArticles(articles.filter((a) => a.id !== id));
      showNotification(
        `Article "${title}" by ${author} was removed`,
        "success",
      );
    } catch (error) {
      handleError(error);
    }
  };

  if (!currentUser) {
    return (
      <div className="auth-container">
        <h2>Log in to application</h2>
        <Alert alert={notification} />
        <SignInPage onSignIn={handleSignIn} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <h2>articles</h2>
      <Alert alert={notification} />
      <div className="user-header">
        <p>
          {currentUser.name} logged in
          <button onClick={handleSignOut}>logout</button>
        </p>
      </div>
      <CollapsibleSection toggleLabel="new article" ref={submissionFormRef}>
        <ArticleSubmissionForm onSubmit={handleCreateArticle} />
      </CollapsibleSection>
      <br />
      <ArticleGrid
        articles={articles}
        onLike={handleIncreaseLikes}
        onRemove={handleDeleteArticle}
        currentUser={currentUser}
      />
    </div>
  );
};

export default App;
