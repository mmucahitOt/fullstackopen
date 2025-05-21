import { useState, useEffect } from "react";
import { Filter, FormPerson, Numbers } from "./components";
import phoneService from "../services/person-service";
import { Notification } from "../components";

const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [notificationSpec, setNotificationSpec] = useState(null);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = () => {
    return phoneService.getAll().then((persons) => {
      setPersons(persons);
    });
  };

  const handleNotification = ({ message, type }) => {
    setNotificationSpec({ message, type });
    setTimeout(() => {
      setNotificationSpec(null);
    }, 3000);
  };


  const handlePersonDelete = (person) => {
    fetchPersons().then(() => {
      phoneService
        .deletePerson(person.id)
        .then(() => {
          handleNotification({
            message: `Deleted ${person.name}`,
            type: "success",
          });
        })
        .finally(() => {
          fetchPersons();
        })
        .catch((error) => {
          console.log(error);
          handleNotification({
            message: `Information of ${person.name} has already been removed from server`,
            type: "error",
          });
        })
        .finally(() => {
          fetchPersons();
        });
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationSpec={notificationSpec} />

      <Filter persons={persons} setFilteredPersons={setFilteredPersons} />
      <FormPerson
        handleNotification={handleNotification}
        fetchPersons={fetchPersons}
      />
      <Numbers
        persons={filteredPersons}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  );
};

export default Phonebook;
