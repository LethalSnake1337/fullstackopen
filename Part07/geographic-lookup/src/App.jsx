import { useState, useEffect } from "react";
import axios from "axios";

const useFormInput = (inputType) => {
  const [input, setInput] = useState("");

  const handleChange = (evt) => {
    setInput(evt.target.value);
  };

  return {
    type: inputType,
    value: input,
    onChange: handleChange,
  };
};

const useLocationData = (locationName) => {
  const [locationInfo, setLocationInfo] = useState(null);

  const fetchLocationData = async (name) => {
    const resp = await axios.get(
      `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`,
    );
    return resp.data;
  };

  useEffect(() => {
    if (locationName !== "") {
      fetchLocationData(locationName)
        .then((resp) => {
          setLocationInfo({ exists: true, content: resp });
        })
        .catch((err) => {
          if (err.response?.status === 404) {
            setLocationInfo({ exists: false });
          } else {
            console.log(err);
          }
        });
    }
  }, [locationName]);

  return locationInfo;
};

const LocationDisplay = ({ locationInfo }) => {
  if (!locationInfo) {
    return null;
  }

  if (!locationInfo.exists) {
    return <div>Location not available...</div>;
  }

  const loc = locationInfo.content;

  return (
    <div>
      <h3>{loc.name.common} </h3>
      <div>Capital: {loc.capital} </div>
      <div>Population: {loc.population}</div>
      <img
        src={loc.flags.svg}
        height="100"
        alt={`flag of ${loc.name.common}`}
      />
    </div>
  );
};

const RootApp = () => {
  const searchField = useFormInput("text");
  const [searchTerm, setSearchTerm] = useState("");
  const locationData = useLocationData(searchTerm);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchField.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input {...searchField} />
        <button>Search</button>
      </form>

      <LocationDisplay locationInfo={locationData} />
    </div>
  );
};

export default RootApp;
