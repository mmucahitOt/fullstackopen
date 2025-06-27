import { useContext } from 'react'
import { UserContext } from '../../../providers/UserContextProvider'
import { Link } from 'react-router-dom'

const Users = () => {
  const { users } = useContext(UserContext)
  console.log('Users', users)
  if (!users || users.length === 0) {
    return <div>No users found</div>
  }
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Users
