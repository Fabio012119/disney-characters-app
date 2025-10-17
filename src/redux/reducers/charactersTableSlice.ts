import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type State = {
  pageSize: number;
  nameInput: string;
  tvInput: string;
  nameQ: string;
  tvQ: string;
  rowCount?: number;
};

const initialState: State = {
  pageSize: 50,
  nameInput: "",
  tvInput: "",
  nameQ: "",
  tvQ: "",
  rowCount: undefined,
};

const charactersTableSlice = createSlice({
  name: "charactersTable",
  initialState,
  reducers: {
    setPageSize: (s, a: PayloadAction<number>) => {
      s.pageSize = a.payload;
    },
    setNameInput: (s, a: PayloadAction<string>) => {
      s.nameInput = a.payload;
    },
    setTvInput: (s, a: PayloadAction<string>) => {
      s.tvInput = a.payload;
    },
    setNameQ: (s, a: PayloadAction<string>) => {
      s.nameQ = a.payload;
    },
    setTvQ: (s, a: PayloadAction<string>) => {
      s.tvQ = a.payload;
    },
    setRowCount: (s, a: PayloadAction<number | undefined>) => {
      s.rowCount = a.payload;
    },
    clearNameInput: (s) => {
      s.nameInput = "";
    },
    clearTvInput: (s) => {
      s.tvInput = "";
    },
  },
});

export const {
  setPageSize,
  setNameInput,
  setTvInput,
  setNameQ,
  setTvQ,
  setRowCount,
  clearNameInput,
  clearTvInput,
} = charactersTableSlice.actions;

export const selectPageSize = (s: RootState) => s.charactersTable.pageSize;
export const selectNameInput = (s: RootState) => s.charactersTable.nameInput;
export const selectTvInput = (s: RootState) => s.charactersTable.tvInput;
export const selectNameQ = (s: RootState) => s.charactersTable.nameQ;
export const selectTvQ = (s: RootState) => s.charactersTable.tvQ;
export const selectRowCount = (s: RootState) => s.charactersTable.rowCount;

export default charactersTableSlice.reducer;
