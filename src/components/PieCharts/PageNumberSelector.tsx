import { useMemo } from "react";
import { range1 } from "@/utils/pieChart";

type Props = {
  value: number;
  totalPages: number;
  count: number;
  nameQ?: string;
  disabled?: boolean;
  onChange: (page: number) => void;
};

const PageNumberSelector = ({
  value,
  totalPages,
  count,
  nameQ,
  disabled = false,
  onChange,
}: Props) => {
  const pageOptions = useMemo(() => range1(totalPages), [totalPages]);

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm">Page</label>
      <select
        className="rounded-md border px-2 py-1.5 text-sm"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled || totalPages <= 1}
      >
        {pageOptions.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <span className="text-xs text-slate-600">
        / {totalPages} • {count} characters
        {nameQ && <> • name: “{nameQ}”</>}
      </span>
    </div>
  );
};

export default PageNumberSelector;
