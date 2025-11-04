import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersData } from "../Exampledata";
import axios from "axios";
// const initialState = { values: UsersData };
const initialState = {
  user: {},

  isLoading: false,

  isSuccess: false,

  isError: false,
};
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      const response = await axios.post("http://localhost:3001/registerUser", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      console.log(response);

      const user = response.data.user; //retrieve the response from the server

      return user; //return the response from the server as payload to the thunk
    } catch (error) {
      console.log(error);
    }
  }
);

export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post("http://localhost:3001/login", {
      email: userData.email,

      password: userData.password,
    });

    const user = response.data.user;

    console.log(response);

    return user;
  } catch (error) {
    //handle the error

    const errorMessage = "Invalid credentials";

    alert(errorMessage);

    throw new Error(errorMessage);
  }
});

export const logout = createAsyncThunk("/users/logout", async () => {
  try {
    // Send a request to your server to log the user out

    const response = await axios.post("http://localhost:3001/logout");
  } catch (error) {}
});
export const userSlice = createSlice({
  name: "users",
  initialState,
  // reducers: {
  //   addUser: (state, action) => {
  //     //State is the current value of the state, Action is triggered outside the reducer and provides a value as payload. Payload is the value coming from the component that will be used to update the value of the state.
  //     state.values.push(action.payload); //add the payload to the state
  //   },
  //   deleteUser: (state, action) => {
  //     state.values = state.values.filter(
  //       (user) => user.email !== action.payload
  //     );
  //   },
  //   udpateUser: (state, action) => {
  //     state.values.map((user) => {
  //       //iterate the  array and compare the email with the email from the payload

  //       if (user.email === action.payload.email) {
  //         user.name = action.payload.name;

  //         user.password = action.payload.password;
  //       }
  //     });
  //   },
  // },
  extraReducers: (builder) => {
    //Asynchronous actions that update the state directly,

    builder
      //register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })

      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
}); //end of slice
export const { addUser, deleteUser, udpateUser } = userSlice.actions;
export default userSlice.reducer;
