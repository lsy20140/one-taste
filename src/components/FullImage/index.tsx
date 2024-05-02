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
      <div className="absolute top-16 bg-black w-screen h-full flex justify-center">
        <IoClose fontSize={32} className="absolute top-8 right-8 text-white cursor-pointer" onClick={() => router.back()} />
        <div className="relative w-1/2 h-full">
          <Image src={url} alt="" fill className="object-contain"/>
        </div>
      </div>
    </>
  )
}
