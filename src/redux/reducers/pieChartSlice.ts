import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ApiResponse } from "@/types/api";
import type { Character } from "@/types/general";
import { getAllCharacters } from "@/api/getAllCharacters";

type State = {
  page: number;
  totalPages: number;
  rows: Character[];
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  page: 1,
  totalPages: 1,
  rows: [],
  loading: false,
  error: null,
};

export const fetchPiePage = createAsyncThunk<ApiResponse, { page: number }>(
  "pieCharts/fetchPiePage",
  async ({ page }, { signal }) => {
    const fetchApiPage = getAllCharacters();
    const res = await fetchApiPage(page, signal);
    return res;
  }
);

const slice = createSlice({
  name: "pieCharts",
  initialState,
  reducers: {
    setPiePage: (s, a: PayloadAction<number>) => {
      s.page = a.payload;
    },
    resetPie: () => initialState,
  },
  extraReducers: (b) => {
    b.addCase(fetchPiePage.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchPiePage.fulfilled, (s, a) => {
      s.loading = false;
      s.rows = a.payload.data ?? [];
      s.totalPages = a.payload.info?.totalPages ?? 1;
    });
    b.addCase(fetchPiePage.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message ?? "Error";
    });
  },
});

export const { setPiePage, resetPie } = slice.actions;

export const selectPiePage = (s: RootState) => s.pieCharts.page;
export const selectPieTotalPages = (s: RootState) => s.pieCharts.totalPages;
export const selectPieRows = (s: RootState) => s.pieCharts.rows;
export const selectPieLoading = (s: RootState) => s.pieCharts.loading;
export const selectPieError = (s: RootState) => s.pieCharts.error;

export default slice.reducer;
