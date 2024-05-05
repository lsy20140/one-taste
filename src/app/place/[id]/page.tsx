import SimplePlace from "@/components/SimplePlace"
import ModalBackground from "@/components/common/ModalBackground"

type Props = {
  params:{
    id: string
  }
}

export default async function SimplePlacePage({params: { id }}: Props) {
  return (
    <> 
      <ModalBackground/>
      <SimplePlace id={id}/>
    </>
  )
}
