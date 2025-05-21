import { useEffect, useState } from "react";

const Filter = ({ persons, setFilteredPersons }) => {
  const [filterByName, setFilterByName] = useState("");

  useEffect(() => {
    const filteredPersons = filterPersons(persons, filterByName);
    setFilteredPersons(filteredPersons);
  }, [persons, filterByName, setFilteredPersons]);

  const handleFilterByNameChange = (event) => {
    const filterValue = event.target.value;
    setFilterByName(filterValue);

    if (filterValue === "") {
      // If filter is empty, show all persons
      console.log("filter is empty");
      setFilteredPersons(persons);
    } else {
      // Otherwise, filter the persons
      const filteredPersons = filterPersons(persons, filterValue);
      setFilteredPersons(filteredPersons);
    }
  };

  return (
    <div>
      filter shown with{" "}
      <input
        id="filterByName"
        value={filterByName}
        onChange={handleFilterByNameChange}
      />
    </div>
  );
};

const filterPersons = (persons, filterByName) => {
  return persons.filter((person) =>
    person.name.toLowerCase().includes(filterByName.toLowerCase())
  );
};

export default Filter;
