import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addPhoneNumber = (event) => {
    event.preventDefault();

    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    const personExists = persons.filter(
      (person) => JSON.stringify(person) === JSON.stringify(newPersonObject)
    );

    if (personExists.length === 0) {
      setPersons(persons.concat(newPersonObject));
    } else {
      alert(`${newName} is already added to phonebook`);
    }

    setNewName("");
    setNewNumber("");
  };

  const handlePhoneChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleOnFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const filteredPerson = persons.filter((person) =>
    person.name.includes(newFilter)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:{" "}
        <input value={newFilter} onChange={handleOnFilterChange} />
      </div>
      <form onSubmit={addPhoneNumber}>
        <div>
          name: <input value={newName} onChange={handlePhoneChange} />
        </div>
        <div>
          number <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPerson.map((person) => (
        <p key={person.number}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
