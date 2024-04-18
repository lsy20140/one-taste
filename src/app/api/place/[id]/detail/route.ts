import { getDetailPlaceInfo } from "@/service/place"
import { NextRequest, NextResponse } from "next/server"
import { Context } from "vm"

export async function GET(_: NextRequest, context: Context) {
  const {id} = context.params

  if(!id) {
    return new NextResponse("Bad Request", {status: 400})
  }

  return getDetailPlaceInfo(Number(id)).then((res) => NextResponse.json(res))
}