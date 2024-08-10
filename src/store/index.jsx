import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/users/authSlice";
import { exerciseApi } from "../api/exerciseApi.js";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [exerciseApi.reducerPath]: exerciseApi.reducer,
    user: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(exerciseApi.middleware),
});

setupListeners(store.dispatch);
