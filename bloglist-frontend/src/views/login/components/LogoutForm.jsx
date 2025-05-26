import Form from "../../../components/common/form/Form";
import localStorageService from "../../../services/local_storage.service";

const LogoutForm = ({ handleRemoveCurrentUser }) => {
  const handleLogout = async () => {
    localStorageService.removeUser();
    handleRemoveCurrentUser(null);
  }; 
  return <Form formTitle="Logout" formProps={{ onSubmit: handleLogout }} buttonText="Logout" buttonProps={{ type: "submit" }}>
  </Form>;
};

export default LogoutForm;