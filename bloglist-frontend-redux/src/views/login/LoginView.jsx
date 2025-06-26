import { useCallback, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../slices/userSlice';
import { setTitle } from '../../slices/uiSlice';

const LoginView = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(setTitle('login in to application'));
  }, [dispatch]);

  const handleLogin = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(loginUser({ username, password }));
    },
    [username, password, dispatch]
  );

  return (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  );
};

export default LoginView;
