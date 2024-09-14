"use client"

import { useGetAllJebo } from "@/hooks/admin/useJebo"
import OneJeboItem from "../OneJeboItem"
import { JeboPlace } from "@/model/place"
import { ClipLoader } from "react-spinners"

export default function JeboList() {
  const { data, isLoading } = useGetAllJebo()
  return (
    <>
      {isLoading && (
        <div className="absolute w-full h-full flex justify-center items-center">
          <ClipLoader color="black" />
        </div>
      )}
      <div className="flex flex-col gap-4">
        {data &&
          data.map((jebo: JeboPlace & { id: number }, idx: number) => (
            <OneJeboItem key={jebo.id} jebo={jebo} />
          ))}
      </div>
    </>
  )
}
