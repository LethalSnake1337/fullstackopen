const Country = ({ name, capital, area, languages, flag }) => {
  let languageArr = Object.values(languages);
  console.log(languageArr);
  return (
    <>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h2>Languages:</h2>
      <ul>
        {languageArr.map((language) => (
          <li key={Math.random()}>{language}</li>
        ))}
      </ul>
      <img src={flag} alt="flag of country" />
    </>
  );
};

export default Country;
