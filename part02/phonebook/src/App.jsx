import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import Communication from "./services/Communication";
import Notification from "./components/Notification";
import NotificationError from "./components/NotificationError";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const hook = () => {
    Communication.getAll().then((persons) => {
      setPersons(persons);
    });
  };
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      Communication.deletePerson(id).then((returnedPersons) => {
        setPersons(
          persons.filter((person) => person.id !== returnedPersons.id)
        );
      });
    }
  };
  useEffect(hook, []);

  const addPhoneNumber = (event) => {
    event.preventDefault();

    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    const personExists = persons.filter(
      (person) => person.name === newPersonObject.name
    );

    if (personExists.length === 0) {
      Communication.create(newPersonObject).then((returnedPersons) => {
        setPersons(persons.concat(returnedPersons));
        setSuccess(`Added ${returnedPersons.name}`);
        setTimeout(() => {
          setSuccess(null);
        }, 5000);
      });
    } else {
      Communication.update(personExists[0].id, newPersonObject)
        .then((returnedPerson) =>
          setPersons(
            persons.map((person) =>
              person.id === returnedPerson.id ? returnedPerson : person
            )
          )
        )
        .catch((err) => {
          setError(
            `Information of "${newPersonObject.name}" has already been removed from server`
          );
          setTimeout(() => {
            setError(null);
          }, 5000);
          setPersons(persons.filter((n) => n.id !== personExists[0].id));
        });
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
      <Notification message={success} />
      <NotificationError message={error} />
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

      <Persons filteredPerson={filteredPerson} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
