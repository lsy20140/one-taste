import { getAllJebo, removeJeboItem } from '@/service/admin/jebo'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return getAllJebo().then((res) => NextResponse.json(res))
}

export async function DELETE(req: NextRequest) {
  const res = await req.json()
  const { jebo_id } = res

  return removeJeboItem(jebo_id).then((res) => NextResponse.json(res))
}
