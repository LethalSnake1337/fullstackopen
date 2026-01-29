import { useSelector, useDispatch } from "react-redux";
import { voteItem } from "../reducers/itemSlice";
import { setAlert } from "../reducers/toastSlice";

const DisplayBoard = () => {
  const items = useSelector((state) =>
    state.search === ""
      ? state.items
      : state.items.filter((item) =>
          item.content.toLowerCase().includes(state.search),
        ),
  );

  const dispatch = useDispatch();

  const handleVote = (item) => {
    dispatch(voteItem(item));
    dispatch(setAlert(`you voted: '${item.content}'`, 10));
  };

  return (
    <div>
      {items
        .slice()
        .sort((a, b) => b.count - a.count)
        .map((item) => (
          <div key={item.id}>
            <div>{item.content}</div>
            <div>
              score {item.count}
              <button onClick={() => handleVote(item)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DisplayBoard;
