import LoginComp from "./components/LoginComp";
import { login } from "../../services/auth.service";
import { useState, useEffect } from "react";
import { Blogs } from "../blog/Blogs";
import localStorageService from "../../services/local_storage.service";

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorageService.getUser();
    console.log("local storage user", user);
    if (user) {
      setUser(user);
    }
  }, []);

  const populateLoggedInUser = (user) => {
    setUser(user);
    localStorageService.setUser(user);
  };

  const handleUserLogout = () => {
    setUser(null);
  };

  if (user) {
    return <Blogs user={user} handleRemoveCurrentUser={handleUserLogout} />
  }

  return (
    <div>
      <h3>login in to application</h3>
      <LoginComp populateLoggedInUser={populateLoggedInUser} />
    </div>
  );
};

export default Login;