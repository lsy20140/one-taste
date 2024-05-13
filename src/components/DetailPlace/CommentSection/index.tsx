'use client'
import CommentsList from "@/components/CommentsList";
import BaseSkeleton from "@/components/Skeleton/BaseSkeleton";
import { useGetDetailPlaceComments } from "@/hooks/usePlace";

export default function CommentSection({placeId}: {placeId: string}) {
  const {data: comments, isLoading, isFetched} = useGetDetailPlaceComments(placeId)

  return (
    <section className="mt-16">
      <p className="text-neutral-700 text-lg">방문자들이 남긴 한줄평을 확인해보세요!</p>
      <hr className="mt-1"/> 
      {isFetched && <CommentsList comments={comments && comments[0].comments}/>}
      {isLoading && 
        <div className="flex flex-col gap-6">
          {Array(12).fill(0).map(() => (
            <BaseSkeleton size="xl"/>
          ))}
        </div>
      }
    </section>
  )
}
