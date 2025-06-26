import localStorageService from '../../../services/localStorageService';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../../slices/userSlice';

const LogOutForm = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    localStorageService.removeUser();
    dispatch(clearUser());
  };
  return <button onClick={handleLogout}>logout</button>;
};

export default LogOutForm;
