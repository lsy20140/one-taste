import SimplePlace from "@/components/SimplePlace"
import ModalBackground from "@/components/common/ModalBackground"

type Props = {
  params:{
    id: string
  }
}

export default async function SimplePlaceModal({params: { id }}: Props) {
  return (
    <> 
      <ModalBackground/>
      <SimplePlace id={id}/>
    </>
  )
}
