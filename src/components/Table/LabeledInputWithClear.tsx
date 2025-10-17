type Props = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  onClear: () => void;
  className?: string;
};

const LabeledInputWithClear = ({
  label,
  value,
  placeholder,
  onChange,
  onClear,
  className = "",
}: Props) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label className="text-sm">{label}</label>
      <input
        className="rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button
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
