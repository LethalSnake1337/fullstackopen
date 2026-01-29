import PropTypes from "prop-types";
import ArticleCard from "../widgets/ArticleCard";

const ArticleGrid = ({ articles, onLike, onRemove, currentUser }) => {
  return (
    <div className="articles-container">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onLike={onLike}
          onRemove={onRemove}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

ArticleGrid.propTypes = {
  articles: PropTypes.array.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default ArticleGrid;
