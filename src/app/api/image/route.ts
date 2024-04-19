import { S3Client } from "@aws-sdk/client-s3"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
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

    const presignedUrl = await createPresignedPost(client, {
      Bucket: BUCKET_NAME as string,
      Conditions: [
        ['content-length-range', 0, 1048576]
      ],
      Fields: {
        key: uuid as string,
      },
      Key: uuid as string,
      Expires: 60,
    })

  return NextResponse.json(presignedUrl)
}