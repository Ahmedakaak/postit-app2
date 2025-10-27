import { createSlice } from "@reduxjs/toolkit";
import { UsersData } from "../Exampledata";
const initialState = { values: UsersData };

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      //State is the current value of the state, Action is triggered outside the reducer and provides a value as payload. Payload is the value coming from the component that will be used to update the value of the state.
      state.values.push(action.payload); //add the payload to the state
    },
    deleteUser: (state, action) => {
      state.values = state.values.filter(
        (user) => user.email !== action.payload
      );
    },
    udpateUser: (state, action) => {
      state.values.map((user) => {
        //iterate the  array and compare the email with the email from the payload

        if (user.email === action.payload.email) {
          user.name = action.payload.name;

          user.password = action.payload.password;
        }
      });
    },
  },
});
export const { addUser, deleteUser, udpateUser } = userSlice.actions;
export default userSlice.reducer;
