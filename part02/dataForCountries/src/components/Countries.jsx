import Country from "./Country";
import { Weather } from "./Weather";
const Countries = ({ filteredCountries, setFilteredCountries }) => {
  const toRender = filteredCountries.length < 10;
  const isOnlyCountry = filteredCountries.length === 1;

  const handleShowEvent = (event) => {
    setFilteredCountries([JSON.parse(event.target.value)]);
  };

  if (isOnlyCountry) {
    const country = filteredCountries.at(0);
    return (
      <>
        <Country
          name={country?.name?.common}
          capital={country?.capital.at(0)}
          area={country?.area}
          languages={country.languages}
          flag={country.flags.png}
        />
        <Weather
          name={country?.name?.common}
          latitude={country.latlng?.at(0)}
          longitude={country.latlng?.at(1)}
        />
      </>
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
