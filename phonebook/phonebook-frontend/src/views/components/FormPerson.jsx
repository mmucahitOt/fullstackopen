import { useState } from "react";
import { FormInput, FormSubmitButton } from "../../components";
import phoneService from "../../services/person-service";
import { nameMissing, nameTooShort, numberInvalid, numberMissing, personAlreadyExists, personNotFound } from "../../errors/validation.errors";


const FormPerson = ({handleNotification, fetchPersons}) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");


  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handlePersonUpdateDialog = (userId, newPerson) => {
    console.log("handlePersonUpdateDialog", userId, newPerson);
    window.confirm(
      `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
    )
      ? phoneService.update(userId, newPerson).then(() => {
          handleNotification({
            message: `Updated ${newPerson.name}`,
            type: "success",
          });
          setNewName("");
          setNewNumber("");
        }).catch((error) => {
          handleUpdatePersonErrors(error, newPerson, handleNotification, handlePersonUpdateDialog);
        })
      : null;
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };


    phoneService.create(newPerson).then((createdPerson) => {
      console.log("createdPerson", createdPerson);
      handleNotification({
        message: `Added ${createdPerson.name}`, 
        type: "success",
      });
      setNewName("");
      setNewNumber("");

    }).catch((error) => {
      handleCreatePersonErrors(error, newPerson, handleNotification, handlePersonUpdateDialog);
      })
      .finally(() => {
        fetchPersons();
      });
  };
  return (
    <form>
      <div>
        <h2>add a new</h2>
        <FormInput
          label="name"
          value={newName}
          onChange={handleNameInputChange}
        />
        <FormInput
          label="number"
          value={newNumber}
          onChange={handleNumberInputChange}
        />
      </div>
      <FormSubmitButton onClick={handlePersonSubmit} />
    </form>
  );

};




function handleCreatePersonErrors(error, newPerson, handleNotification, handlePersonUpdateDialog) {
  if (error.response.status === 400 && error.response.data.error === personAlreadyExists.message) {
    handlePersonUpdateDialog(error.response.data.userId, newPerson);
  } 

  if (error.response)
  if (error.response.status === 400 && error.response.data.error === nameMissing.message) {
    handleNotification({
      message: "name is required",
      type: "error",
    });
  }

  if (error.response.status === 400 && error.response.data.error === nameTooShort.message) {
    handleNotification({
      message: nameTooShort.message,
      type: "error",
    });
  }

  if (error.response.status === 400 && error.response.data.error === numberMissing.message) {
    handleNotification({
      message: "number is required",
      type: "error",
    });
  }

  if (error.response.status === 400 && error.response.data.error === numberInvalid.message) {
    handleNotification({
      message: numberInvalid.message,
      type: "error",
    });
  }
}

function handleUpdatePersonErrors(error, newPerson, handleNotification) {
  if (error.response.status === 400 && error.response.data.error === nameMissing.message) {
    handleNotification({
      message: nameMissing.message,
      type: "error",
    });
  }

  if (error.response.status === 400 && error.response.data.error === nameTooShort.message) {
    handleNotification({
      message: nameTooShort.message,
      type: "error",
    });
  }

  if (error.response.status === 400 && error.response.data.error === numberMissing.message) {
    handleNotification({
      message: numberMissing.message,
      type: "error",
    });
  }

  if (error.response.status === 400 && error.response.data.error === personNotFound.message) {
    handleNotification({
      message: personNotFound.message,
      type: "error",
    });
  }
}


export default FormPerson;
