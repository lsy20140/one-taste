'use client'
import Image from "next/image";
import { MdOutlineZoomOutMap } from "react-icons/md"
import HeartButton from "../HeartButton";
import {useRouter} from 'next/navigation'
import Link from "next/link";

type Props = {
  image_url: string
  image_id: Number
}

export default function OneImageItem({image_url, image_id}: Props) {
  const router = useRouter()

  return (
    <>
      <div className="relative w-32 h-32 group">
        <Image src={image_url} alt={image_url} fill className="ob ject-cover"/>
        <div className="absolute w-full h-full opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute flex flex-col gap-1 z-[2] top-1 right-1">
            <Link href={{ pathname: `/image`, query:{url: image_url}}}>
              <MdOutlineZoomOutMap color="white" title="이미지 확대" cursor={'pointer'} fontSize={24}/>
            </Link>
            <HeartButton liked={true} size="small"/>
          </div>
          <div className="absolute w-full h-full bg-black bg-opacity-70 z-[1]" />
        </div>
      </div>
    </>
  )
}