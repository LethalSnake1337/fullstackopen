import { useState } from "react";

const ArticleCard = ({ article, onLike, onRemove, currentUser }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRemoveClick = () => {
    if (
      window.confirm(`Remove article "${article.title}" by ${article.author}?`)
    ) {
      onRemove(article);
    }
  };

  const cardContainerStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="article-card" style={cardContainerStyle}>
      <div>
        {article.title} {article.author}{" "}
        <button id="expand-button" onClick={toggleExpanded}>
          {isExpanded ? "hide" : "view"}
        </button>
      </div>
      {isExpanded && (
        <>
          <a href={article.url}>{article.url}</a>
          <div>
            likes {article.likes}
            <button id="like-button" onClick={() => onLike(article)}>
              like
            </button>
          </div>
          <div>{article.user.name}</div>
          {article.user.username === currentUser.username && (
            <div>
              <button id="delete-button" onClick={handleRemoveClick}>
                remove
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ArticleCard;
