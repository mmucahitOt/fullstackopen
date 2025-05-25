import Form from "../../../components/common/form/Form";
import FormInput from "../../../components/common/form/FormInput";

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
  return <Form formTitle="Login" formProps={{ onSubmit: handleLogin }} buttonText="Login" buttonProps={{ type: "submit" }}>
    <FormInput inputDivProps={{ className: "form-group" }} inputProps={{ label: "Username", type: "text", name: "username", value: username, onChange: ({ target }) => setUsername(target.value) }} />
    <FormInput inputDivProps={{ className: "form-group" }} inputProps={{ label: "Password", type: "password", name: "password", value: password, onChange: ({ target }) => setPassword(target.value) }} />
  </Form>;
};

export default LoginForm;