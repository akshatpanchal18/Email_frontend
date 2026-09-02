import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  token: null,
  user: null,
};
const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setToken: (state, action) => {
      // console.log(action);
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setUserType: (state, action) => {
      // console.log(action);
      state.type = action.payload;
    },
    clearUserType: (state) => {
      state.type = "";
    },
    setUser: (state, action) => {
      // console.log(action);
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.type = "";
    },
  },
});
export const {
  setToken,
  clearToken,
  setUserType,
  clearUserType,
  setUser,
  clearUser,
  setLogout,
} = stateSlice.actions;
export default stateSlice.reducer;
