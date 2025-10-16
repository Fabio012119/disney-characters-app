import type { ChangeEventHandler } from "react";

const Input = ({
  type,
  value,
  onChange,
} : {
    type : "password" | "username",
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>
}) => {
  return (
    <label className="block text-black">
      <span className="text-sm capitalize">{type}</span>
      <input
        className="mt-1 w-full text-black rounded-lg border px-3 py-2 placeholder:capitalize"
        placeholder={type}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
