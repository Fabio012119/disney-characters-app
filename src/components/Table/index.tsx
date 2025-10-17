import { useMemo, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { PAGE_SIZES, API_PAGE_SIZE } from "../../constants";
import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
  type GridApi,
} from "ag-grid-community";
import { columnItems } from "../../helpers/table.helpers";
import { defaultColDef } from "../../constants/defaultColDef";
import { gridThemeStyle } from "../../constants/themeStyle";
import { useDebouncedQuery } from "../../hooks/useDebouncedQuerry";
import { getAllCharacters } from "../../api/getAllCharacters";
import { createDisneyDatasource } from "../../datasource/createDisneyDatasource";
import { usePreserveTopRowOnPageSize } from "../../hooks/usePreserveTopRowOnPageSize";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CharacterModal from "../CharacterModal";
import LabeledInputWithClear from "./LabeledInputWithClear";
import {
  selectNameInput,
  selectTvInput,
  selectNameQ,
  selectTvQ,
  selectPageSize,
  selectRowCount,
  setNameInput,
  setTvInput,
  setNameQ,
  setTvQ,
  setPageSize,
  setRowCount,
  clearNameInput,
  clearTvInput,
  openModalById,
} from "../../redux/reducers/charactersTableSlice";
import { getOneCharacter } from "../../api/getOneCharacter";

ModuleRegistry.registerModules([AllCommunityModule]);

const CharactersTable = () => {
  const dispatch = useAppDispatch();
  const pageSize = useAppSelector(selectPageSize);
  const nameInput = useAppSelector(selectNameInput);
  const tvInput = useAppSelector(selectTvInput);
  const nameQ = useAppSelector(selectNameQ);
  const tvQ = useAppSelector(selectTvQ);
  const rowCount = useAppSelector(selectRowCount);

  const apiRef = useRef<GridApi | null>(null);
  const pageSizeRef = useRef<number>(50);
  const prevPageSizeRef = useRef<number>(50);

  useEffect(() => {
    pageSizeRef.current = pageSize;
  }, [pageSize]);

  usePreserveTopRowOnPageSize(apiRef, pageSize, prevPageSizeRef);

  useDebouncedQuery(
    nameInput,
    tvInput,
    (v) => dispatch(setNameQ(v)),
    (v) => dispatch(setTvQ(v)),
    apiRef,
    300
  );

  const fetchApiPage = useMemo(() => getAllCharacters(nameQ), [nameQ]);

  const datasource = useMemo(
    () =>
      createDisneyDatasource({
        fetchApiPage,
        tvQ,
        pageSizeRef,
        setRowCount: (n) => dispatch(setRowCount(n)),
      }),
    [dispatch, fetchApiPage, tvQ]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <LabeledInputWithClear
          label="Search by name"
          value={nameInput}
          placeholder="Minnie"
          onChange={(v) => dispatch(setNameInput(v))}
          onClear={() => dispatch(clearNameInput())}
        />

        <LabeledInputWithClear
          label="Filter by TV show"
          value={tvInput}
          placeholder="DuckTales"
          onChange={(v) => dispatch(setTvInput(v))}
          onClear={() => dispatch(clearTvInput())}
        />

        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm">Rows per page</label>
          <select
            className="rounded-md px-2 py-2 text-sm shadow-lg focus:outline-none focus:ring"
            value={pageSize}
            onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
          >
            {PAGE_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className="ag-theme-quartz w-full rounded-xl shadow-sm overflow-hidden"
        style={gridThemeStyle}
      >
        <AgGridReact
          theme={themeQuartz}
          onGridReady={(e) => {
            apiRef.current = e.api;
          }}
          columnDefs={columnItems}
          defaultColDef={defaultColDef}
          rowModelType="infinite"
          cacheBlockSize={API_PAGE_SIZE}
          pagination
          paginationPageSize={pageSize}
          paginationPageSizeSelector={false}
          datasource={datasource}
          rowHeight={40}
          headerHeight={40}
          suppressCellFocus
          animateRows
          overlayNoRowsTemplate="No data"
          onRowClicked={(e) => {
            const id = Number(e.data?.id);
            if (Number.isFinite(id)) {
              dispatch(openModalById(id));
              dispatch(getOneCharacter(id));
            }
          }}
          overlayLoadingTemplate='<span class="ag-overlay-loading-center">Loading…</span>'
          onSortChanged={() => apiRef.current?.purgeInfiniteCache()}
        />
      </div>

      {typeof rowCount === "number" && (
        <div className="text-xs text-slate-600">
          {rowCount.toLocaleString()} total characters
        </div>
      )}
      <CharacterModal />
    </div>
  );
};

export default CharactersTable;
