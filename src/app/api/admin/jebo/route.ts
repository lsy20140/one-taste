import { getAllJebo } from "@/service/admin/jebo"
import { NextResponse } from "next/server"

export async function GET() {
  return getAllJebo().then((res) => NextResponse.json(res))
}
