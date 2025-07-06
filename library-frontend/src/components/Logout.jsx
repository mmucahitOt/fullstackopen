import { useCurrentUser } from "../provider/current-user.hook";
import localStorageService from "../services/local-storage.service";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useCurrentUser();
  
  const handleLogout = () => {
    localStorageService.removeUser();
    setCurrentUser(null);
    navigate("/");
  };
  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;