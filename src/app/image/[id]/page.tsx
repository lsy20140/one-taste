import FullImage from "@/components/FullImage"
import { BASE_URL } from "@/constants"

type Props = {
  params:{
    id: string
  }
}

async function getImageUrl(id: string) {
  const res = await fetch(`${BASE_URL}/api/image/${id}`, {
    method: 'GET'
  })
  return res.json()
}

export default async function FullImagePage({params: { id }}: Props) {
  const res = await getImageUrl(id)
  const item = res[0]
  const url = item.image_url

  if(url) {
    return (
      <>
        <FullImage url={item && item.image_url}/>
      </>
    )
  }
}