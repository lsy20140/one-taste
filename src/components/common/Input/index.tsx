"use client";
import React, { InputHTMLAttributes, forwardRef } from "react";

type InputProps = {} & InputHTMLAttributes<HTMLInputElement>;

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { ...props },
  ref
) {
  return (
    <input
      ref={ref}
      {...props}
      className="w-full h-full py-3 px-4 bg-white border border-neutral-300 shadow-sm rounded-full outline-none placeholder:text-ellipsis overflow-hidden"
    />
  );
});
