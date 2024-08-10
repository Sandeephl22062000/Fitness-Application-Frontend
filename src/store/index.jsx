import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/users/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    user: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);
