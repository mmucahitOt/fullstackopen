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
    <table className="table table-striped">
      <thead className="table-light">
        <tr>
          <th className="text-primary">name</th>
          <th className="text-primary">blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="table-light">
            <td className="text-primary">
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td className="text-primary">{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Users
