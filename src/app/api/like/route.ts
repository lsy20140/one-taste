import { dislikePlace, likePlace } from "@/service/place"
import { NextRequest, NextResponse } from "next/server"

// 식당 종아요/좋아요 취소
export async function POST(req: NextRequest) {
  const res = await req.json()
  const {id, like} = res

  // like 타입 Boolean -> !like가 아닌 null로 판단
  if(!id || like == null) {
    return new NextResponse("Bad Request", {status: 400})
  } 

  const request = like ? likePlace : dislikePlace
  
  return request(id).then((res) => NextResponse.json(res))
}