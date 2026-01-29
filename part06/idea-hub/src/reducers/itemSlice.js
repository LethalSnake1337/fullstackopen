import { createSlice } from "@reduxjs/toolkit";
import itemService from "../services/items";

export const initializeItems = () => {
  return async (dispatch) => {
    const items = await itemService.getAll();
    dispatch(populateItems(items));
  };
};

export const postItem = (content) => {
  return async (dispatch) => {
    const newItem = await itemService.post({ content, count: 0 });
    dispatch(addItem(newItem));
  };
};

export const voteItem = (item) => {
  return async (dispatch) => {
    const updated = await itemService.updateCount({
      ...item,
      count: item.count + 1,
    });
    dispatch(incrementCount(updated.id));
  };
};

const itemSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    incrementCount: (state, action) => {
      const id = action.payload;
      const index = state.findIndex((i) => i.id === id);
      state[index].count += 1;
    },
    addItem: (state, action) => {
      state.push(action.payload);
    },
    populateItems: (_state, action) => {
      return action.payload;
    },
  },
});

export const { incrementCount, addItem, populateItems } = itemSlice.actions;

export default itemSlice.reducer;
