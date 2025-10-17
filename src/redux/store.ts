import { configureStore } from "@reduxjs/toolkit";
import auth from "../redux/reducers/authSlice";
import view from "../redux/reducers/viewsSlice"

export const store = configureStore({
  reducer: { auth, view },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
