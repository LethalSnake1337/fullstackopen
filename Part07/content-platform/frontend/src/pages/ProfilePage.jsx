import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
  const { id } = useParams()
  const profiles = useSelector((state) => state.profiles)
  const profile = profiles.find((p) => p.id === id)

  if (!profile) return <div>Profile not found</div>

  return (
    <div>
      <h1>{profile.fullname}</h1>
      <h3>{profile.login}</h3>
      <h4>Articles</h4>
      <ul>
        {profile.entries?.map((e) => (
          <li key={e.id}>
            <Link to={`/articles/${e.id}`}>{e.heading}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProfilePage
