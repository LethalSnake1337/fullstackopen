import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CreationPanel from "./components/CreationPanel";
import DisplayBoard from "./components/DisplayBoard";
import SearchBar from "./components/SearchBar";
import Toast from "./components/Toast";
import { initializeItems } from "./reducers/itemSlice";

const Root = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeItems());
  }, [dispatch]);

  return (
    <div>
      <h2>Idea Hub</h2>
      <Toast />
      <SearchBar />
      <DisplayBoard />
      <CreationPanel />
    </div>
  );
};

export default Root;
