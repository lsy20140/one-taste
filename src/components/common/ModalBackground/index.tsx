'use client'
import { useRouter } from "next/navigation"

export default function ModalBackground() {
  const router = useRouter()

  return (
    <>
      <div 
        className='fixed top-0 w-full h-full bg-black bg-opacity-35 z-40 '
        onClick={() => router.back()}
      />
    </>
  )
}
