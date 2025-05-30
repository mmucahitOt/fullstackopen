import Form from '../../../components/common/form/Form'
import localStorageService from '../../../services/localStorageService'
import PropTypes from 'prop-types'

const LogOutForm = ({ handleRemoveCurrentUser }) => {
  const handleLogout = async () => {
    localStorageService.removeUser()
    handleRemoveCurrentUser(null)
  }
  return (
    <Form formTitle='Logout' formProps={{ onSubmit: handleLogout }} buttonText='Logout' buttonProps={{ type: 'submit' }}>
    </Form>
  )
}

LogOutForm.propTypes = {
  handleRemoveCurrentUser: PropTypes.func.isRequired,
}

export default LogOutForm