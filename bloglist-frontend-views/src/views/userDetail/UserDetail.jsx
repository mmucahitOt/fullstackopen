import { useContext } from 'react'
import { UserContext } from '../../providers/UserContextProvider'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
  const { getUser } = useContext(UserContext)
  const { id } = useParams()
  const user = getUser(id)

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <div>
        added blogs
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UserDetail
