import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE } from "../constants";
import type { Character } from "../types/general";

export const getOneCharacter = createAsyncThunk(
  "charactersTable/getOneCharacter",
  async (id: number) => {
    const r = await fetch(`${API_BASE}/character/${id}`);
    if (!r.ok) throw new Error("Failed to load character");
    const j = await r.json();
    return j.data as Character;
  }
);
