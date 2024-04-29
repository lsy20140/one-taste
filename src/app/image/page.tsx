import FullImage from "@/components/FullImage"

type Props = {
  searchParams:{
    [key: string]: string
  }
}

export default async function FullImagePage({searchParams}:Props) {
  const url = searchParams.url

  return (
    <>
      <FullImage url={url}/>
    </>
  )
}