import LoginForm from "./components/LoginForm";
import { login } from "../../services/auth.service";
import { useState } from "react";
import { Blogs } from "../blog/Blogs";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await login(username, password);
      console.log(response);
      setUser(response.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  if (user) {
    return <Blogs user={user} />
  }

  return (
    <div>
      <h3>login in to application</h3>
      <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
    </div>
  );
};

export default Login;