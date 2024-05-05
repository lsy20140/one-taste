import SimplePlace from "@/components/SimplePlace"

type Props = {
  params:{
    id: string
  }
}

export default async function SimplePlaceModal({params: { id }}: Props) {
  return (
    <> 
      <SimplePlace id={id}/>
    </>
  )
}
