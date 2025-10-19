import { useEffect, useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchPiePage,
  selectPieLoading,
  selectPieError,
  selectPieRows,
  selectPiePage,
  selectPieTotalPages,
  setPiePage,
} from "@/redux/reducers/pieChartSlice";
import { toPieSeriesData, buildPieOptions } from "@/utils/pieChart";
import PageNumberSelector from "./PageNumberSelector";
import { exportPieXlsx } from "@/utils/exportPieXlsx";
import "./index.css";

const PieCharts = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPiePage);
  const totalPages = useAppSelector(selectPieTotalPages);
  const rows = useAppSelector(selectPieRows);
  const loading = useAppSelector(selectPieLoading);
  const err = useAppSelector(selectPieError);

  useEffect(() => {
    dispatch(fetchPiePage({ page }));
  }, [dispatch, page]);

  const seriesData = useMemo(() => toPieSeriesData(rows), [rows]);
  const options = useMemo(
    () => buildPieOptions(page, seriesData),
    [page, seriesData]
  );

  return (
    <div className="space-y-4">
      <div className="w-full flex justify-between border-b-2 border-blue-500 p-5">
        <PageNumberSelector
          value={page}
          totalPages={totalPages}
          count={rows.length}
          disabled={loading}
          onChange={(p) => dispatch(setPiePage(p))}
        />
        <button
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-60"
          data-testid="export-slsx-btn"
          onClick={() => exportPieXlsx(page, seriesData)}
          disabled={loading || !seriesData.length}
        >
          Export XLSX
        </button>
      </div>

      {loading && <div className="text-sm text-slate-600">Loading…</div>}
      {err && <div className="text-sm text-red-600">{err}</div>}
      {!loading && !err && (
        <div data-testid="pie-chart">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      )}
    </div>
  );
};

export default PieCharts;
