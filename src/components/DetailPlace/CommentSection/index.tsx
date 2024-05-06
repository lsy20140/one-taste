'use client'
import CommentsList from "@/components/CommentsList";
import { useGetDetailPlaceComments } from "@/hooks/usePlace";

export default function CommentSection({placeId}: {placeId: string}) {
  const {data: comments} = useGetDetailPlaceComments(placeId)

  return (
    <section className="mt-16">
      <p className="text-neutral-700 text-lg">방문자들이 남긴 한줄평을 확인해보세요!</p>
      <hr className="mt-1"/> 
      <CommentsList comments={comments && comments[0].comments}/>
    </section>
  )
}
