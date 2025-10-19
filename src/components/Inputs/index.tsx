import type { FormInputsProps } from "@/types/component-props";

const Input = ({ type, value, onChange }: FormInputsProps) => {
  return (
    <label className="block text-black">
      <span className="text-sm capitalize">{type}</span>
      <input
        data-testid={`login-${type}`}
        className="mt-1 w-full text-black rounded-lg border px-3 py-2 placeholder:capitalize"
        placeholder={type}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
