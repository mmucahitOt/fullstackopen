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
    <div className="container">
      <h2 className="text-primary">{user.name}</h2>
      <div className="list-group">
        added blogs
        <ul className="list-group-item">
          {user.blogs.map((blog) => (
            <li key={blog.id} className="list-group-item">
              {blog.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UserDetail
