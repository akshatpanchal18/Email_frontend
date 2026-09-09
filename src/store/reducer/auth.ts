import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  status: "anonymous" | "authenticated";
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  status: "anonymous",
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<AuthState["status"]>) => {
      state.status = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.status = "anonymous";
      state.token = null;
      state.user = null;
    },
  },
});

export const { setAuthStatus, setToken, setUser, clearAuth } =
  authSlice.actions;
export default authSlice.reducer;
