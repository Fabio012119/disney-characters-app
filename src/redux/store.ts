import { configureStore } from "@reduxjs/toolkit";
import auth from "@/redux/reducers/authSlice";
import view from "@/redux/reducers/viewsSlice";
import charactersTable from "@/redux/reducers/charactersTableSlice";
import pieCharts from "@/redux/reducers/pieChartSlice";

export const store = configureStore({
  reducer: { auth, view, charactersTable, pieCharts },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
