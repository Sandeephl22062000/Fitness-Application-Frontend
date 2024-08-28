import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/users/authSlice";
import { exerciseApi } from "../api/exerciseApi.js";
import { postsApi } from "../api/posts.js";
import { dietApi } from "../api/dietApi.js";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [exerciseApi.reducerPath]: exerciseApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [dietApi.reducerPath]: dietApi.reducer,
    user: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(exerciseApi.middleware)
      .concat(postsApi.middleware)
      .concat(dietApi.middleware),
});

setupListeners(store.dispatch);
