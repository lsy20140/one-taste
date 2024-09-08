import { getAllPlaces } from "@/service/admin/place";
import { NextResponse } from "next/server";

export async function GET() {
  return getAllPlaces().then((res) => NextResponse.json(res));
}
