import React from 'react'

export default function Label({ children }: { children: React.ReactNode }) {
  return <label className='text-lg font-medium'>{children}</label>
}
