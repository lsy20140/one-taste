'use client'
import React from 'react'

type Props = {
  placeholder: string,
  value?: string,
  maxLength?: number,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur?: () => void
}

export default function Input({placeholder, value, maxLength, onChange, onBlur}: Props) {
  return (
    <input 
      className='w-full h-full py-2 px-4 bg-white border border-neutral-300 shadow-sm rounded-full outline-none'
      placeholder={placeholder}
      value={value ?? ""}
      maxLength={maxLength}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}
