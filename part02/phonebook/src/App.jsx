import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPhoneNumber = (event) => {
    event.preventDefault();

    const newPersonObject = {
      name: newName,
    };

    const personExists = persons.filter(
      (person) => JSON.stringify(person) === JSON.stringify(newPersonObject)
    );

    if (personExists.length === 0) {
      setPersons(persons.concat(newPersonObject));
      setNewName("");
      return;
    }

    alert(`${newName} is already added to phonebook`);
    setNewName("");
  };

  const handlePhoneChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPhoneNumber}>
        <div>
          name: <input value={newName} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
