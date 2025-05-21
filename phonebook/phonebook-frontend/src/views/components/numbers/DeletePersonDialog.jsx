import { DialogButton } from "../../../components";

const DeletePersonDialog = ({ person, handlePersonDelete }) => {
  return (
    <DialogButton
      message={`delete`}
      handleDialogOpen={() => handlePersonDelete(person)}
      handleDialogClose={() => {}}
    />
  );
};

export default DeletePersonDialog;
