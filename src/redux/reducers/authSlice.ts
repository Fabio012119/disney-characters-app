import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = { isLoggedIn: boolean; username: string };
const STORAGE = "auth:v1";

const load = (): AuthState => {
  try { return JSON.parse(localStorage.getItem(STORAGE) || ""); }
  catch { return { isLoggedIn: false, username: "" }; }
};

const initial: AuthState =
  typeof window !== "undefined" ? load() : { isLoggedIn: false, username: "" };

const slice = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {
    loginSuccess: (s, a: PayloadAction<{ username: string }>) => {
      s.isLoggedIn = true; s.username = a.payload.username;
      localStorage.setItem(STORAGE, JSON.stringify(s));
    },
    logout: (s) => {
      s.isLoggedIn = false; s.username = "";
      localStorage.setItem(STORAGE, JSON.stringify(s));
    },
  },
});

export const { loginSuccess, logout } = slice.actions;
export default slice.reducer;
