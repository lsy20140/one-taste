import { addComment } from "@/service/place"
import { NextRequest, NextResponse } from "next/server"

// 한줄평 저장
export async function POST(req: NextRequest) {
  const res = await req.json()
  const {id, content} = res

  if(!id || !content) {
    return new NextResponse("Bad Request", {status: 400})
  } 
  
  return addComment(content, id).then((res) => NextResponse.json(res))
}