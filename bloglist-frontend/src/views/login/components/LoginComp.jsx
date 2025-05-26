import { useState } from "react";
import Form from "../../../components/common/form/Form";
import FormInput from "../../../components/common/form/FormInput";
import { login } from "../../../services/auth.service";

const LoginComp = ({ populateLoggedInUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await login(username, password);
      console.log(response);
      populateLoggedInUser(response.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  return <Form formTitle="Login" formProps={{ onSubmit: handleLogin }} buttonText="Login" buttonProps={{ type: "submit" }}>
    <FormInput inputDivProps={{ className: "form-group" }} inputProps={{ label: "Username", type: "text", name: "username", value: username, onChange: ({ target }) => setUsername(target.value) }} />
    <FormInput inputDivProps={{ className: "form-group" }} inputProps={{ label: "Password", type: "password", name: "password", value: password, onChange: ({ target }) => setPassword(target.value) }} />
  </Form>;
};

export default LoginComp;