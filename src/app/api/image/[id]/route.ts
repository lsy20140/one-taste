import { getImageUrl } from "@/service/place";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    id: Number
  }
}

export async function GET(_: NextRequest, context: Context) {
  const {id} = context.params

  if(!id) {
    return new NextResponse("Bad Request", {status: 400})
  }

  return getImageUrl(Number(id)).then((res) => NextResponse.json(res))
}