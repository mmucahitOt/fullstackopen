import { useCallback, useContext, useEffect, useState } from 'react'
import Form from '../../components/common/form/Form'
import FormInput from '../../components/common/form/FormInput'
import { TitleContext } from '../../providers/TitleContextProvider'
import { AuthContext } from '../../providers/AuthContextProvider'
import { Navigate, useNavigate } from 'react-router-dom'

const LoginView = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { handleTitle } = useContext(TitleContext)
  const { loginUser } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user) {
      navigate('/blogs')
    }
  }, [user, navigate])

  useEffect(() => {
    handleTitle('login in to application')
  }, [])

  const handleLogin = useCallback(
    (event) => {
      event.preventDefault()
      loginUser.mutate({ username, password })
    },
    [username, password, loginUser]
  )

  return (
    <>
      <Form
        formProps={{ onSubmit: handleLogin }}
        buttonText="Login"
        buttonProps={{ type: 'submit' }}
      >
        <FormInput
          inputDivProps={{ className: 'form-group' }}
          inputProps={{
            label: 'Username',
            type: 'text',
            name: 'username',
            value: username,
            onChange: ({ target }) => setUsername(target.value),
          }}
        />
        <FormInput
          inputDivProps={{ className: 'form-group' }}
          inputProps={{
            label: 'Password',
            type: 'password',
            name: 'password',
            value: password,
            onChange: ({ target }) => setPassword(target.value),
          }}
        />
      </Form>
    </>
  )
}

export default LoginView
