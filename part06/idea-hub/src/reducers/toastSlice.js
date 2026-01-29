import { createSlice } from "@reduxjs/toolkit";

export const setAlert = (message, duration) => {
  return async (dispatch) => {
    dispatch(displayAlert(message));
    setTimeout(() => {
      dispatch(clearAlert());
    }, duration * 1000);
  };
};

const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: {
    displayAlert: (state, action) => {
      const text = action.payload;
      const id = Math.floor(Math.random() * 1000000);
      state.push({ text, id });
    },
    clearAlert: (state, _action) => {
      state.shift();
    },
  },
});

export const { displayAlert, clearAlert } = toastSlice.actions;

export default toastSlice.reducer;
