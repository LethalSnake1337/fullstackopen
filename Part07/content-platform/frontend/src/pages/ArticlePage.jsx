import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import articlesApi from '../services/articlesApi'
import { modifyArticle } from '../slices/articlesSlice'

const ArticlePage = () => {
  const { id } = useParams()
  const articles = useSelector((state) => state.articles)
  const article = articles.find((a) => a.id === id)
  const dispatch = useDispatch()
  const [newRemark, setNewRemark] = useState('')

  const handleAddRemark = async () => {
    try {
      const updated = await articlesApi.addRemark(id, newRemark)
      dispatch(modifyArticle(updated))
      setNewRemark('')
    } catch (error) {
      console.error('Failed to add remark')
    }
  }

  if (!article) return <div>Not found</div>

  return (
    <div>
      <h1>{article.heading}</h1>
      <p>By {article.writer}</p>
      <p>Votes: {article.votes}</p>
      <a href={article.resource}>{article.resource}</a>
      <div>
        <h3>Feedback</h3>
        <ul>
          {article.feedback?.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          value={newRemark}
          onChange={(e) => setNewRemark(e.target.value)}
          placeholder="Add feedback"
        />
        <button onClick={handleAddRemark}>Add</button>
      </div>
    </div>
  )
}

export default ArticlePage
