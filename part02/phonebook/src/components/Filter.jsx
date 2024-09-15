const Filter = ({ newFilter, handleOnFilterChange }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={newFilter} onChange={handleOnFilterChange} />
    </div>
  );
};

export default Filter;
