'use client'
import React from 'react'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({onChange}: Props) {
  return (
    <input 
      className='w-full h-full px-3 bg-neutral-100 rounded-lg outline-none'
      onChange={onChange}
    />
  )
}
