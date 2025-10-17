import { loginSuccess } from "../redux/reducers/authSlice";
import type React from "react";
import type { NavigateFunction } from "react-router-dom";
import type { AppDispatch } from "../redux/store";

const USER = "disney";
const PASS = "disney123";

export function onSubmit(
  e: React.FormEvent<HTMLFormElement>,
  password: string,
  username: string,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  setErr: React.Dispatch<React.SetStateAction<string | null>>
): void {
  e.preventDefault();

  if (username === USER && password === PASS) {
    dispatch(loginSuccess({ username }));
    navigate("/dashboard", { replace: true });
  } else {
    setErr("Invalid username or password.");
  }
}
