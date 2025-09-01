import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLink: "", // Значение по умолчанию
};

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setCurrentLink: (state, action) => {
      state.currentLink = action.payload;
    },
  },
});

export const { setCurrentLink } = linkSlice.actions;

export default linkSlice.reducer;