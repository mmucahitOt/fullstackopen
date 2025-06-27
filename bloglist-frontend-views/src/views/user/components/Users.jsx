import { useContext } from 'react'
import { UserContext } from '../../../providers/UserContextProvider'

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
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Users
