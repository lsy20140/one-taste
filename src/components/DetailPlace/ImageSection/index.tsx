'use client'
import ImageGrid from "@/components/ImageGrid";
import OneImageItemSkeleton from "@/components/Skeleton/OneImageItem";
import GridLayout from "@/components/common/GridLayout";
import { useGetDetailPlaceImages } from "@/hooks/usePlace";

export default function ImageSection({placeId}: {placeId: string}) {
  const {data: images, isLoading, isFetched} = useGetDetailPlaceImages(placeId)

  return (
    <section className="mt-14">
      <div className="flex gap-4 items-baseline">
        <p className="text-neutral-700 text-lg">사진</p>
        <p className="text-sm text-neutral-400">10MB 이내의 사진만 첨부가능합니다</p>
      </div>
      <hr className="my-1"/> 
      {/* 사진 리스트 */}
      {isFetched && <ImageGrid images={images && images[0].images} />}
      {isLoading && 
        <GridLayout>
          {Array(16).fill(0).map(() => (
            <OneImageItemSkeleton />
          ))}
        </GridLayout>
      }
    </section>
  )
}
