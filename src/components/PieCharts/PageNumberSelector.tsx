import { useMemo } from "react";
import { range1 } from "@/utils/pieChart";
import type { PageNumberSelectorProps } from "@/types/component-props";

const PageNumberSelector = ({
  value,
  totalPages,
  count,
  nameQ,
  disabled = false,
  onChange,
}: PageNumberSelectorProps) => {
  const pageOptions = useMemo(() => range1(totalPages), [totalPages]);

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm">Page</label>
      <select
        className="rounded-md border px-2 py-1.5 text-sm"
        data-testid="page-selector"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled || totalPages <= 1}
      >
        {pageOptions.map((p) => (
          <option key={p} value={p} data-testid={`page-opt-${p}`}>
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
