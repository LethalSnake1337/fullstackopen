import Country from "./Country";
const Countries = ({ filteredCountries, setFilteredCountries }) => {
  const toRender = filteredCountries.length < 10;
  const isOnlyCountry = filteredCountries.length === 1;

  const handleShowEvent = (event) => {
    setFilteredCountries([JSON.parse(event.target.value)]);
  };

  if (isOnlyCountry) {
    const country = filteredCountries.at(0);
    return (
      <Country
        name={country?.name?.common}
        capital={country?.capital.at(0)}
        area={country?.area}
        languages={country.languages}
        flag={country.flags.png}
      />
    );
  } else if (toRender) {
    return filteredCountries.map((country) => (
      <>
        <p key={`X-${country.ccn3}`}>
          {country?.name?.common}{" "}
          <button value={JSON.stringify(country)} onClick={handleShowEvent}>
            Show
          </button>
        </p>
      </>
    ));
  } else {
    return <></>;
  }
};

export default Countries;
