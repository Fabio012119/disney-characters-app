import { useEffect, useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectNameQ } from "../../redux/reducers/charactersTableSlice";
import {
  fetchPiePage,
  selectPieLoading,
  selectPieError,
  selectPieRows,
  selectPiePage,
  selectPieTotalPages,
  setPiePage,
} from "../../redux/reducers/pieChartSlice";
import { toPieSeriesData, buildPieOptions } from "../../utils/pieChart";
import PageNumberSelector from "./PageNumberSelector";
import "./index.css";

const PieCharts = () => {
  const dispatch = useAppDispatch();
  const nameQ = useAppSelector(selectNameQ);
  const page = useAppSelector(selectPiePage);
  const totalPages = useAppSelector(selectPieTotalPages);
  const rows = useAppSelector(selectPieRows);
  const loading = useAppSelector(selectPieLoading);
  const err = useAppSelector(selectPieError);

  useEffect(() => {
    dispatch(fetchPiePage({ page, nameQ }));
  }, [dispatch, page, nameQ]);

  const seriesData = useMemo(() => toPieSeriesData(rows), [rows]);
  const options = useMemo(
    () => buildPieOptions(page, seriesData),
    [page, seriesData]
  );

  return (
    <div className="space-y-4">
      <PageNumberSelector
        value={page}
        totalPages={totalPages}
        count={rows.length}
        nameQ={nameQ}
        disabled={loading}
        onChange={(p) => dispatch(setPiePage(p))}
      />

      {loading && <div className="text-sm text-slate-600">Loading…</div>}
      {err && <div className="text-sm text-red-600">{err}</div>}
      {!loading && !err && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default PieCharts;
