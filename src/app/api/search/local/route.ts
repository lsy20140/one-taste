import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest, res: NextResponse){
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")
  const api_url = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query+"")}&display=5&start=1&sort=random`;

  if(!query){
    return new NextResponse("Bad Request", {status: 400})
  }

  const response = await fetch(api_url, {
    headers: {
      'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID ?? "",
      'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET ?? "",
    },
  })

  const data = await response.json()

  return NextResponse.json(data, { status: 200 });
}