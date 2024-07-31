import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import user from "./user";
import post from "./post";
import food from "./food";
import trainer from "./trainer";
const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: {
    user,
    trainer,
    post,
    food,
  },
  middleware,
});

export default store;
