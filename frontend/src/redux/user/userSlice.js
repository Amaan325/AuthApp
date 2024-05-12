import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error : null
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetErrorMessage : (state) => {
      state.error = false;
      state.loading = false;
    } , 
    signInStart: (state) => {
      state.loading = true;
      state.error = false;

    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {signInFailure , signInStart , signInSuccess , resetErrorMessage} = userSlice.actions
export default userSlice.reducer;