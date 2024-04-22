import { addPlaceImage } from "@/service/place";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

// presignedURL 요청하는 부분
export async function GET(_: NextRequest) {
    const uuid = crypto.randomUUID().replace(/-/g, "")
  
    // .env.local AWS관련 환경변수
    const REGION = process.env.NEXT_PUBLIC_AWS_REGION
    const BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
    const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY
    const SECRET_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
        
    const client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: ACCESS_KEY as string,
        secretAccessKey: SECRET_KEY as string,
      },
    });

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME as string,
      Key: uuid as string,
      ContentType: 'image/'
    })

    const url = await getSignedUrl(client, command, {expiresIn: 600})

    return NextResponse.json({url: url, uuid: uuid})
}


// 이미지 URL DB에 저장하는 부분
export async function POST(req: NextRequest) {
  const res = await req.json()
  const {id, url} = res

  if(!id || !url) {
    return new NextResponse("Bad Request", {status: 400})
  } 

  return addPlaceImage({id, url}).then((res) => NextResponse.json(res))
}