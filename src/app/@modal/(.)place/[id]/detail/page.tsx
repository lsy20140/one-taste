import CommentSection from "@/components/DetailPlace/CommentSection"
import ImageSection from "@/components/DetailPlace/ImageSection"
import InfoSection from "@/components/DetailPlace/InfoSection"
import { getDetailPlaceComments, getDetailPlaceImages, getDetailPlaceInfo } from "@/lib/api/place"

type Props = {
  params:{
    id: string
  }
}

export default async function DetailPlaceModal({params: { id }}: Props) {
  const infoData = await getDetailPlaceInfo(id)
  const imagesData = await getDetailPlaceImages(id)
  const commentsData = await getDetailPlaceComments(id)

  const [info, images, comments] = await Promise.all([infoData, imagesData, commentsData])

  return (
    <>
      <div className='absolute top-16 w-full h-[calc(100vh-64px)] bg-neutral-50 px-24 max-md:px-16 max-sm:px-0 overflow-y-auto'>
        <div className="max-w-3xl h-fit min-h-full mx-auto py-8 px-10 rounded-lg bg-white box-content">
          <InfoSection info={info[0]}/>
          <ImageSection images={images[0].images}/>
          <CommentSection comments={comments[0].comments}/>
        </div>
      </div>
    </>
  )
}
