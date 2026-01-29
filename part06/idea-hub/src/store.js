import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./reducers/itemSlice";
import searchReducer from "./reducers/searchSlice";
import toastReducer from "./reducers/toastSlice";

const hub = configureStore({
  reducer: {
    items: itemReducer,
    search: searchReducer,
    toast: toastReducer,
  },
  devTools: true,
});

export default hub;
