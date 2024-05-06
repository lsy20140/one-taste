'use client'
import ImageGrid from "@/components/ImageGrid";
import { useGetDetailPlaceImages } from "@/hooks/usePlace";

export default function ImageSection({placeId}: {placeId: string}) {
  const {data: images} = useGetDetailPlaceImages(placeId)

  return (
    <section className="mt-14">
      <div className="flex gap-4 items-baseline">
        <p className="text-neutral-700 text-lg">사진</p>
        <p className="text-sm text-neutral-400">10MB 이내의 사진만 첨부가능합니다</p>
      </div>
      <hr className="my-1"/> 
      {/* 사진 리스트 */}
      <ImageGrid images={images && images[0].images} />
    </section>
  )
}
