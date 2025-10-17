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
import { createApiFetcher } from "../../api/createApiFetcher";
import { createDisneyDatasource } from "../../datasource/createDisneyDatasource";
import { usePreserveTopRowOnPageSize } from "../../hooks/usePreserveTopRowOnPageSize";
import { useDispatch, useSelector } from "react-redux";
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
} from "../../redux/reducers/charactersTableSlice";

ModuleRegistry.registerModules([AllCommunityModule]);

const CharactersTable = () => {
  const dispatch = useDispatch();
  const pageSize = useSelector(selectPageSize);
  const nameInput = useSelector(selectNameInput);
  const tvInput = useSelector(selectTvInput);
  const nameQ = useSelector(selectNameQ);
  const tvQ = useSelector(selectTvQ);
  const rowCount = useSelector(selectRowCount);

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

  const fetchApiPage = useMemo(() => createApiFetcher(nameQ), [nameQ]);

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
        <div className="flex items-center gap-2">
          <label className="text-sm">Search by name</label>
          <input
            className="rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring"
            value={nameInput}
            onChange={(e) => dispatch(setNameInput(e.target.value))}
            placeholder="Minnie"
          />
          {nameInput && (
            <button
              className="rounded-md border px-2 py-1 text-sm shadow-sm hover:bg-gray-50"
              onClick={() => dispatch(clearNameInput())}
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Filter by TV show</label>
          <input
            className="rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring"
            value={tvInput}
            onChange={(e) => dispatch(setTvInput(e.target.value))}
            placeholder="DuckTales"
          />
          {tvInput && (
            <button
              className="rounded-md border px-2 py-1 text-sm shadow-sm hover:bg-gray-50"
              onClick={() => dispatch(clearTvInput())}
            >
              Clear
            </button>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm">Rows per page</label>
          <select
            className="rounded-md border px-2 py-2 text-sm shadow-sm focus:outline-none focus:ring"
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
        className="ag-theme-quartz w-full rounded-xl border shadow-sm overflow-hidden"
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
          overlayLoadingTemplate='<span class="ag-overlay-loading-center">Loading…</span>'
          onSortChanged={() => apiRef.current?.purgeInfiniteCache()}
        />
      </div>

      {typeof rowCount === "number" && (
        <div className="text-xs text-slate-600">
          {rowCount.toLocaleString()} total characters
        </div>
      )}
    </div>
  );
};

export default CharactersTable;
