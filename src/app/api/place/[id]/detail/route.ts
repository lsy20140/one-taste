import { addPlaceImage, getDetailPlaceInfo } from "@/service/place"
import { NextRequest, NextResponse } from "next/server"

type Context = {
  params:{
    id: string
  }
}

export async function GET(_: NextRequest, context: Context) {
  const {id} = context.params

  if(!id) {
    return new NextResponse("Bad Request", {status: 400})
  }

  return getDetailPlaceInfo(Number(id)).then((res) => NextResponse.json(res))
}

// 이미지 URL DB에 저장하는 부분
export async function POST(req: NextRequest, context: Context) {
  const {id} = context.params
  const res = await req.json()
  const url = res.url

  if(!id) {
    return new NextResponse("Bad Request", {status: 400})
  } 

  return addPlaceImage(id, url).then((res) => NextResponse.json(res))
}