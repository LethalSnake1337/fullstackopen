const Persons = ({ filteredPerson }) => {
  return (
    <>
      {filteredPerson.map((person) => (
        <p key={person.number}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
