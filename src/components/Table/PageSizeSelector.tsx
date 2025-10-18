import { PAGE_SIZES } from "@/constants";
import { setPageSize } from "@/redux/reducers/charactersTableSlice";
import { useAppDispatch } from "@/redux/hooks";

const PageSizeSelector = ({ pageSize }: { pageSize: number }) => {
  const dispatch = useAppDispatch();

  return (
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
  );
};

export default PageSizeSelector;
