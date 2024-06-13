import { addJebo } from "@/service/jebo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  const res = await req.json()
  const {jeboList} = res
  
  if(!jeboList.length){
    return new NextResponse("Bad Request", {status: 400})
  }

  return addJebo(jeboList).then((res) => NextResponse.json(res))
}
