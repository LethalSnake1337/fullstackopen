import { useDispatch } from "react-redux";
import { postItem } from "../reducers/itemSlice";
import { setAlert } from "../reducers/toastSlice";

const CreationPanel = () => {
  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();
    const input = event.target.itemInput.value;
    event.target.itemInput.value = "";
    dispatch(postItem(input));
    dispatch(setAlert(`you added: '${input}'`, 10));
  };

  return (
    <div>
      <h2>new idea</h2>
      <form onSubmit={handleCreate}>
        <div>
          <input name="itemInput" />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default CreationPanel;
