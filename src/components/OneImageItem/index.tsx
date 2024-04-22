'use client'
import Image from "next/image";

type Props = {
  image_url: string
}

export default function OneImageItem({image_url}: Props) {
  return (
    <>
      <Image src={image_url} alt={image_url} width={144} height={144}/>
    </>
  )
}
