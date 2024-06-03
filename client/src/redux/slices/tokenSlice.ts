import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/UserType";

interface TokenState {
  token: string | null;
  user: User | null;
  rememberMe: boolean;
}

const initialState: TokenState = {
  user: null,
  token: null,
  rememberMe: false,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setRememberMe: (state, action) => {
      localStorage.setItem("Token", JSON.stringify(action.payload));
      state.token = action.payload;
      state.rememberMe=true;
    },
    setDoNotRememberMe: (state, action) => {
      sessionStorage.setItem("Token", JSON.stringify(action.payload));
      state.token = action.payload;
      state.rememberMe=false;
    },
    setToken: (state, action) => {
        state.token = action.payload;
      },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearTokenState: () => {
      return initialState;
    },
  },
});

export const { setRememberMe, setDoNotRememberMe, setUser, clearTokenState, setToken } =
  tokenSlice.actions;
export default tokenSlice.reducer;
