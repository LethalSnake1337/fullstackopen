const PersonForm = ({
  addPhoneNumber,
  newName,
  newNumber,
  handlePhoneChange,
  handleNumberChange,
}) => {
  return (
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
  );
};

export default PersonForm;
