import { addNewPlace, getAllPlaces } from '@/service/admin/place'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return getAllPlaces().then((res) => NextResponse.json(res))
}

export async function POST(req: NextRequest) {
  const res = await req.json()
  const { placeInfo } = res

  if (!placeInfo) {
    return new NextResponse('Bad Request', { status: 400 })
  }
  return addNewPlace(placeInfo).then((res) => NextResponse.json(res))
}
