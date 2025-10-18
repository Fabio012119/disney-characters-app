import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

export type DashboardView = "DATA_TABLE" | "PIE_CHARTS";

type ViewState = { current: DashboardView };
const initialState: ViewState = { current: "DATA_TABLE" };

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView(state, action: PayloadAction<DashboardView>) {
      state.current = action.payload;
    },
  },
});

export const { setView } = viewSlice.actions;
export const selectView = (s: RootState) => s.view.current;
export default viewSlice.reducer;
