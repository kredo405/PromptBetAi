import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSport: "", // Значение по умолчанию
};

const sportSlice = createSlice({
  name: "sport",
  initialState,
  reducers: {
    setCurrentSport: (state, action) => {
      state.currentSport = action.payload;
    },
  },
});

export const { setCurrentSport } = sportSlice.actions;

export default sportSlice.reducer;