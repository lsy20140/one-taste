import { getAllPlaces } from "@/service/place";
import { NextResponse } from "next/server";

export async function GET() {
  return getAllPlaces().then((res) => NextResponse.json(res))
}