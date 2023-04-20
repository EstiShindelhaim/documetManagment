import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  officer:{}
};

export const counterSlice = createSlice({
  name: "officer",
  initialState,
  reducers: {
    currentOfficer: (state, action) => {
      state.officer = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
