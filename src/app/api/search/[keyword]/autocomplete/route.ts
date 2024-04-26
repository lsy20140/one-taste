import { NextRequest, NextResponse } from "next/server";
import { getAutocompletePlaces } from "@/service/place";

type Context = {
  params:{
    keyword: string
  }
}

export async function GET(_: NextRequest, context: Context){
  const keyword = context.params.keyword

  if(!keyword){
    return new NextResponse("Bad Request", {status: 400})
  }

  return getAutocompletePlaces(keyword).then((res) => NextResponse.json(res))
}