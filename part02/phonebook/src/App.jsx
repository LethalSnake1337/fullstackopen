import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

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

      <Filter
        newFilter={newFilter}
        handleOnFilterChange={handleOnFilterChange}
      />

      <PersonForm
        addPhoneNumber={addPhoneNumber}
        newName={newName}
        newNumber={newNumber}
        handlePhoneChange={handlePhoneChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons filteredPerson={filteredPerson} />
    </div>
  );
};

export default App;
