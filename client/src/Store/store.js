import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Features/UserSlice.js"; //import the reducer
export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
