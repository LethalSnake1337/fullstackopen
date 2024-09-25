import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([{}]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  return (
    <>
      <Filter
        countries={countries}
        setFilteredCountries={setFilteredCountries}
        filteredCountries={filteredCountries}
      />
      <Countries
        filteredCountries={filteredCountries}
        setFilteredCountries={setFilteredCountries}
      />
    </>
  );
};

export default App;
