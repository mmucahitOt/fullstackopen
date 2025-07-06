import { useEffect, useState } from "react";
import { useLogin } from "../graphql/queryHooks/mutations";
import localStorageService from "../services/local-storage.service";
import { useCurrentUser } from "../provider/current-user.hook";
import { useNavigate } from "react-router-dom";
import { resetApolloClient } from "../graphql/apolloClient";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  console.log("currentUser", currentUser);

  const { login, data } = useLogin();

  useEffect(() => {
    if (currentUser) {
      navigate("/books");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (data?.login) {
      setUsername("");
      setPassword("");
      localStorageService.setUser({ token: data.login.value });
      console.log(localStorageService.getUser());
      setCurrentUser({token: data.login.value});
      resetApolloClient();
    }
  }, [data, login, setCurrentUser]);

  const submit = async (event) => {
    event.preventDefault();
    await login({ variables: { username, password } });
  };

  return (
    <div>
    <form onSubmit={submit}>
      <div>
        username <input value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password <input value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;