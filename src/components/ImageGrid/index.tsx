import { Image as ImageType } from "@/model/place";
import GridLayout from "../common/GridLayout";
import OneImageItem from "../OneImageItem";
import ImageUploadBox from "../ImageUploadBox";

type Props = {
  images: ImageType[]
}

export default async function ImageGrid({images}: Props) {
  images.sort((a,b) => {
    return new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
  })
  
  return (
    <>
      <GridLayout>
        <ImageUploadBox/>
        {
          images.map((image, idx) => {
            const {image_url} = image
            return (
              <OneImageItem key={idx} image_url={image_url}/> 
            )
          })
        }
      </GridLayout>
    </>
  )
}
