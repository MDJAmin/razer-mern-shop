import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNew: null,
  isPass: null,
  identifier: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (state, action) => {
      state.isNew = action.payload.isNew;
      state.isPass = action.payload.isPass;
      state.identifier = action.payload.identifier;
    },
    isNewToFalse: (state) => {
      state.isNew = false;
    },
  },
});

export const { auth, isNewToFalse } = authSlice.actions;
export default authSlice.reducer;