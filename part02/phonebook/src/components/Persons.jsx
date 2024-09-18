import Communication from "../services/Communication";

const Persons = ({ filteredPerson, handleDelete }) => {
  return (
    <>
      {filteredPerson.map((person) => (
        <>
          <p key={person.number}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>
              delete
            </button>
          </p>
        </>
      ))}
    </>
  );
};

export default Persons;
