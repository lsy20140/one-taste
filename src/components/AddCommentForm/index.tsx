'use client'
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { usePathname } from "next/navigation";
import { useAddComment } from "@/hooks/usePlace";

export default function AddCommentForm() {
  const [input, setInput] = useState<string>('')
  const pathname = usePathname()
  const id = pathname.split('/')[2]
  const {isPending, addComment} = useAddComment(id)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    addComment(input)
    setInput('')
  }
  return (
    <form onSubmit={handleSubmit} className="w-full h-20 flex items-end flex-col gap-2">
      <Input 
        placeholder="식당에 대한 한줄평을 남겨주세요! (최대 200자)"
        onChange={(e) => handleChange(e)}
        value={input}
        maxLength={200}
      />
      <div className="w-1/6">
        <Button text="저장" color="red"/>
      </div>
      {isPending && <p>저장중~~~~~</p>}
    </form>
  )
}
