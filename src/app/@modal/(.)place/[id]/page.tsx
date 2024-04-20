import SimplePlace from "@/components/SimplePlace"
import { BASE_URL } from "@/constants"

type Props = {
  params:{
    id: string
  }
}

async function getSimplePlace(id: string) {
  const res = await fetch(`${BASE_URL}/api/place/${id}`, {
    method: 'GET'
  })
  return res.json()
}

export default async function SimplePlaceModal({params: { id }}: Props) {
  const res = await getSimplePlace(id)
  const info = res[0]

  if(info) {
    return (
      <> 
        <SimplePlace id={id} info={info}/>
      </>
    )
  }
}
