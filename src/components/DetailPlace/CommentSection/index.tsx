import CommentsList from "@/components/CommentsList";
import { Comment } from "@/model/place";

export default function CommentSection({comments}:{comments: Comment[]}) {
  return (
    <section className="mt-16">
      <p className="text-neutral-700 text-lg">방문자들이 남긴 한줄평을 확인해보세요!</p>
      <hr className="mt-1"/> 
      <CommentsList comments={comments}/>
    </section>
  )
}
