import { useState } from "react";
const Filter = ({ countries, setFilteredCountries, filteredCountries }) => {
  const [filterValue, setFilterValue] = useState("");

  const handleFilterValue = (event) => {
    const value = event.target.value;
    setFilterValue(value);

    const newFilteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(newFilteredCountries);
  };

  return (
    <div>
      find countries: <input value={filterValue} onChange={handleFilterValue} />
    </div>
  );
};

export default Filter;
