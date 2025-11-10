import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Features/UserSlice.js"; //import the reducer
import postsReducer from "../Features/PostSlice.js";
export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  },
});
