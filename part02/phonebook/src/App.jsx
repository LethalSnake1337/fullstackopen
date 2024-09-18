import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import { useEffect } from "react";
import Communication from "./services/Communication";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const hook = () => {
    Communication.getAll().then((persons) => {
      setPersons(persons);
    });
  };

  useEffect(hook, []);

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
      Communication.create(newPersonObject).then((returnedPersons) =>
        setPersons(persons.concat(returnedPersons))
      );
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
