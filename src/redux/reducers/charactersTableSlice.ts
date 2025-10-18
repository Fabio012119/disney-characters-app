import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getOneCharacter } from "@/api/getOneCharacter";
import type { RootState } from "@/store";
import type { Character } from "@/types/general";

type State = {
  pageSize: number;
  nameInput: string;
  tvInput: string;
  nameQ: string;
  tvQ: string;
  rowCount?: number;

  isModalOpen: boolean;
  selectedId: number | null;
  detail: Character | null;
  detailLoading: boolean;
  detailError: string | null;
};

const initialState: State = {
  pageSize: 50,
  nameInput: "",
  tvInput: "",
  nameQ: "",
  tvQ: "",
  rowCount: undefined,

  isModalOpen: false,
  selectedId: null,
  detail: null,
  detailLoading: false,
  detailError: null,
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

    openModalById: (s, a: PayloadAction<number>) => {
      s.isModalOpen = true;
      s.selectedId = a.payload;
      s.detail = null;
      s.detailError = null;
    },
    closeModal: (s) => {
      s.isModalOpen = false;
      s.selectedId = null;
      s.detail = null;
      s.detailLoading = false;
      s.detailError = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(getOneCharacter.pending, (s) => {
      s.detailLoading = true;
      s.detailError = null;
    });
    b.addCase(getOneCharacter.fulfilled, (s, a) => {
      s.detailLoading = false;
      s.detail = a.payload;
    });
    b.addCase(getOneCharacter.rejected, (s, a) => {
      s.detailLoading = false;
      s.detailError = a.error.message ?? "Error";
    });
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
  openModalById,
  closeModal,
} = charactersTableSlice.actions;

export const selectIsModalOpen = (s: RootState) =>
  s.charactersTable.isModalOpen;
export const selectDetail = (s: RootState) => s.charactersTable.detail;
export const selectDetailLoading = (s: RootState) =>
  s.charactersTable.detailLoading;
export const selectDetailError = (s: RootState) =>
  s.charactersTable.detailError;

export const selectPageSize = (s: RootState) => s.charactersTable.pageSize;
export const selectNameInput = (s: RootState) => s.charactersTable.nameInput;
export const selectTvInput = (s: RootState) => s.charactersTable.tvInput;
export const selectNameQ = (s: RootState) => s.charactersTable.nameQ;
export const selectTvQ = (s: RootState) => s.charactersTable.tvQ;
export const selectRowCount = (s: RootState) => s.charactersTable.rowCount;

export default charactersTableSlice.reducer;
