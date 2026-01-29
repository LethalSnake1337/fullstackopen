import { useDispatch } from "react-redux";
import { updateSearch } from "../reducers/searchSlice";

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleInput = (event) => {
    const term = event.target.value;
    dispatch(updateSearch(term.trim().toLowerCase()));
  };
  const panelStyle = {
    marginBottom: 10,
  };

  return (
    <div style={panelStyle}>
      search <input onChange={handleInput} />
    </div>
  );
};

export default SearchBar;
