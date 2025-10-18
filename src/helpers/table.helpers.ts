import type { ColDef } from "ag-grid-community";
import type { Row } from "@/types/table";

export const columnItems: ColDef<Row>[] = [
  { field: "name", headerName: "Character", flex: 1, sortable: true },
  {
    field: "tvShowsCount",
    headerName: "Number of TV shows",
    width: 200,
    sortable: true,
  },
  {
    field: "videoGamesCount",
    headerName: "Number of Video games",
    width: 250,
    sortable: true,
  },
  { field: "allies", headerName: "Allies", flex: 1, },
  { field: "enemies", headerName: "Enemies", flex: 1, },
];
