import { BASE_URL } from "@/constants"

// 한줄평 추가
export const postComment = async (placeId: string, comment: string) => {
  const res = await fetch(`${BASE_URL}/api/comment`,{
    method: 'POST',
    body: JSON.stringify({id: placeId, content: comment})
  })
  return res.json()
}