import LoginForm from "./components/LoginForm";
import { login } from "../../services/auth.service";
import { useState, useEffect } from "react";
import { Blogs } from "../blog/Blogs";
import localStorageService from "../../services/local_storage.service";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorageService.getUser();
    console.log("local storage user", user);
    if (user) {
      setUser(user);
    }
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await login(username, password);
      console.log(response);
      setUser(response.data);
      localStorageService.setUser(response.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  const handleRemoveCurrentUser = () => {
    setUser(null);
  };

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  if (user) {
    return <Blogs user={user} handleRemoveCurrentUser={handleRemoveCurrentUser} />
  }

  return (
    <div>
      <h3>login in to application</h3>
      <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
    </div>
  );
};

export default Login;