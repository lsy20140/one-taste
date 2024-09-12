import { useEffect, useState } from "react";

export default function FilterInput({
  value: initValue,
  onChange,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, 300);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="outline outline-[1px] outline-gray-300 py-2 px-4 rounded font-light mt-2"
    />
  );
}
