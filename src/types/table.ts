import type { Character } from "./general";

export type Row = {
  id: string;
  name: string;
  tvShowsCount: number;
  videoGamesCount: number;
  allies: string;
  enemies: string;
  raw: Character;
};
