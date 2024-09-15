import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person) => (
        <p key={person.number}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
