import { Comment } from "@/model/place";
import AddCommentForm from "../AddCommentForm";

type Props = {
  comments: Comment[]
}

export default function CommentsList({comments}: Props) {
  comments && comments.sort((a,b) => {
    return new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
  })
  return (
    <>
    {
        <div className="p-2 flex flex-col gap-4">
          <AddCommentForm />
          <>
            {
              !comments ?
                <p>아직 한줄평이 없어요</p>
              :
              comments.map((comment, idx) => (
                <div key={idx} className="flex gap-3 py-3 items-center justify-between">
                  <p>{comment.content}</p>
                  <p className="min-w-20 text-neutral-500 text-sm">{comment.created_date.toString().slice(0,10)}</p>
                </div>
              ))
            }
          </>
        </div> 
    }
    </>
  )
}
