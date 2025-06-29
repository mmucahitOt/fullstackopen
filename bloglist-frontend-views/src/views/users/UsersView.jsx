import { useEffect, useContext } from 'react'
import Users from './components/Users'
import { TitleContext } from '../../providers/TitleContextProvider'

const UserView = () => {
  const { handleTitle } = useContext(TitleContext)

  useEffect(() => {
    handleTitle('users')
  }, [])

  return (
    <div className="container">
      <Users />
    </div>
  )
}

export default UserView
