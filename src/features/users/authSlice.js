import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: null,
  },
  reducers: {
    loggedInUser: (state, action) => {
      const { token, user } = action.payload;
      localStorage.setItem("id", user);
      localStorage.setItem("token", token);
      state.token = token;
      state.user = user;
    },
    logOutUser: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("id");
    },
  },
});

export const { loggedInUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;
