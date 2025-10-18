import { toCsv } from "./general";
import type { Character } from "@/types/general";
import type { Row } from "@/types/table";

export const buildRow = (c: Character): Row => ({
  id: c._id,
  name: c.name,
  tvShowsCount: c.tvShows?.length ?? 0,
  videoGamesCount: c.videoGames?.length ?? 0,
  allies: toCsv(c.allies),
  enemies: toCsv(c.enemies),
  raw: c,
});
