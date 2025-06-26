import { useState, useEffect } from 'react';
import localStorageService from './services/localStorageService';
import LoginView from './views/login/LoginView';
import Notification from './components/Notification';
import BlogView from './views/blog/BlogView';
import LogoutForm from './views/login/components/LogoutForm';
import Text from './components/Text';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './slices/userSlice';
import { setUser } from './slices/userSlice';
import { selectTitle } from './slices/uiSlice';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const title = useSelector(selectTitle);

  useEffect(() => {
    const user = localStorageService.getUser();
    if (user) {
      dispatch(setUser(user));
    }
  }, []);

  return (
    <div>
      <h3>{title}</h3>
      <Notification />

      {user && <Text style={{ marginBottom: '10px' }} text={user.username + ' logged in'} />}
      {user && <LogoutForm />}

      {!user && <LoginView />}
      {user && <BlogView />}
    </div>
  );
};

export default App;
