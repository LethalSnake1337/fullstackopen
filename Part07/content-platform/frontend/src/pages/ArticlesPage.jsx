import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ArticlesPage = () => {
  const items = useSelector((state) => state.articles)

  return (
    <div>
      <h2>Articles</h2>
      <Link to="/">Create New</Link>
      <ul>
        {items.map((article) => (
          <li key={article.id}>
            <Link to={`/articles/${article.id}`}>
              {article.heading}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ArticlesPage
