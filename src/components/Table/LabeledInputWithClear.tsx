import type { LabeledInputWithClearProps } from "@/types/component-props";

const LabeledInputWithClear = ({
  label,
  value,
  placeholder,
  onChange,
  onClear,
  className = "",
}: LabeledInputWithClearProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label data-testid={`table-input-${label}-label`} className="text-sm">
        {label}
      </label>
      <input
        className="rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring"
        value={value}
        data-testid={`table-input-${label}`}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button
          data-testid={`table-input-${label}-clear-btn`}
          className="rounded-md border px-2 py-1 text-sm shadow-sm hover:bg-gray-50"
          onClick={onClear}
          type="button"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default LabeledInputWithClear;
