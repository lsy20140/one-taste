import DetailPlace from "@/components/DetailPlace"
import { BASE_URL } from "@/constants"

type Props = {
  params:{
    id: string
  }
}

async function getDetailPlace(id: string) {
  const res = await fetch(`${BASE_URL}/api/place/${id}/detail`, {
    method: 'GET'
  })
  return res.json()
}

export default async function DetailPlacePage({params: { id }}: Props) {
  const res = await getDetailPlace(id)
  const info = res[0]

  if(info) {
    return (
      <>
        <DetailPlace info={info}/>
      </>
    )
  }

}
