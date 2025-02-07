import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  role: null,
  token: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInWaiting: (state) => {
      state.loading = false
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload.currentUser;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, signInWaiting } = userSlice.actions;

export default userSlice.reducer;
