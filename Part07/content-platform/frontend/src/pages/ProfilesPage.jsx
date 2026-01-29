import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ProfilesPage = () => {
  const profiles = useSelector((state) => state.profiles)

  return (
    <div>
      <h2>User Profiles</h2>
      <table>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>
                <Link to={`/people/${profile.id}`}>
                  {profile.fullname}
                </Link>
              </td>
              <td>{profile.entries?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProfilesPage
