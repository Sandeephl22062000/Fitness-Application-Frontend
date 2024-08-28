import { createSlice } from "@reduxjs/toolkit";

const dietSlice = createSlice({
  name: "food",
  initialState: {
    maintainceCalories: null,
  },
  reducers: {
    maintaince: (state, action) => {
      const { calories } = action.payload;
      state.food = calories;
    },
  },
});

export const { maintaince } = dietSlice.actions;

export default dietSlice.reducer;
