'use client'
import React from 'react'

type Props = {
  placeholder: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur?: () => void
}

export default function Input({placeholder, onChange, onBlur}: Props) {
  return (
    <input 
      className='w-full h-full px-4 bg-white border border-neutral-300 shadow-sm rounded-full outline-none'
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}
