"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { usePathname } from "next/navigation";
import { useAddComment } from "@/hooks/usePlace";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";

export default function AddCommentForm() {
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const { isPending, addComment } = useAddComment(id);
  const session = useSession();
  const user = session.data?.user;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    if (!user) {
      alert("로그인 후 댓글 작성이 가능합니다.");
      return;
    }
    addComment(input);
    setInput("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-20 flex items-end flex-col gap-2"
    >
      <Input
        placeholder="식당에 대한 한줄평을 남겨주세요! (최대 200자)"
        onChange={(e) => handleChange(e)}
        value={input}
        maxLength={200}
      />
      <div className="w-1/6">
        <Button bgColor={input ? "black" : "disabled"} textColor="white">
          <p>저장</p>
        </Button>
      </div>
      {isPending && (
        <div className="h-6 w-full flex flex-col gap-1 justify-center items-center">
          <ClipLoader color="#ef4444" />
          <p className="text-xs">저장중</p>
        </div>
      )}
    </form>
  );
}
