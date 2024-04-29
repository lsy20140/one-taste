import { Image as ImageType } from "@/model/place";
import GridLayout from "../common/GridLayout";
import OneImageItem from "../OneImageItem";
import ImageUploadBox from "../ImageUploadBox";

type Props = {
  images: ImageType[]
}

export default async function ImageGrid({images}: Props) {
  images && images.sort((a,b) => {
    return new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
  })
  
  return (
    <>
      <GridLayout>
        <ImageUploadBox/>
        {
          images ? images.map((image, idx) => {
            const {image_id, image_url} = image
            return (
              <OneImageItem key={idx} image_url={image_url} image_id={image_id}/> 
            )
          })
          :
          <p>아직 사진이 없어요</p>
        }
      </GridLayout>
    </>
  )
}
