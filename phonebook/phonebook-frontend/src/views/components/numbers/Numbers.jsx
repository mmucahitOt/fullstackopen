import DeletePersonDialog from "./DeletePersonDialog";

const Numbers = ({ persons, handlePersonDelete }) => {
  if (!persons || persons.length === 0) {
    return <div>No numbers found</div>;
  }
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}{" "}
          <DeletePersonDialog
            person={person}
            handlePersonDelete={handlePersonDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default Numbers;
