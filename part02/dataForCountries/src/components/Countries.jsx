import Country from "./Country";
const Countries = ({ filteredCountries }) => {
  const toRender = filteredCountries.length < 10;
  const isOnlyCountry = filteredCountries.length === 1;

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
      <p key={`X-${country.ccn3}`}>{country?.name?.common} </p>
    ));
  } else {
    return <></>;
  }
};

export default Countries;
