'use client'
import Image from "next/image";
import { useRouter } from "next/navigation"
import { IoClose } from "react-icons/io5"

type Props = {
  url: string
}

export default function FullImage({url}: Props) {
  const router = useRouter()
  return (
    <>
      <div className="relative bg-black w-screen h-screen flex justify-center z-[50]">
        <IoClose fontSize={32} className="absolute top-8 right-8 text-white cursor-pointer" onClick={() => router.back()} />
        <div className="relative w-1/2 h-full">
          <Image src={url} alt="" fill className="object-contain"/>
        </div>
      </div>
    </>
  )
}
