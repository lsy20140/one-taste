import { BASE_URL } from "@/constants"

// 지도 위 식당 전체 리스트 조회
export const getAllPlaces = async () => {
  const res = await fetch(`${BASE_URL}/api/place`)
  return res.json()
}

// 식당 요약 정보 조회(지도 마커 클릭 시)
export const getSimplePlace = async (placeId: string) => {
  const res = await fetch(`${BASE_URL}/api/place/${placeId}`)
  return res.json()
}

// 식당 좋아요
export const updateLikePlace = async (placeId: string, like: Boolean) => {
  const res = await fetch(`${BASE_URL}/api/like`,{
    method: 'POST',
    body: JSON.stringify({id: placeId, like: like})
  })
  return res.json()
}

// 식당 상세 페이지 기본 정보 조회
export const getDetailPlaceInfo = async (placeId: string) => {
  const res = await fetch(`${BASE_URL}/api/place/${placeId}/detail`)
  return res.json()
}

// 식당 상세 페이지 이미지 전체 조회
export const getDetailPlaceImages = async (placeId: string) => {
  const res = await fetch(`${BASE_URL}/api/place/${placeId}/images`)
  return res.json()
}

// 식당 상세 페이지 한줄평 전체 조회
export const getDetailPlaceComments = async (placeId: string) => {
  const res = await fetch(`${BASE_URL}/api/place/${placeId}/comments`)
  return res.json()
}

// 한줄평 추가
export const postComment = async (placeId: string, comment: string) => {
  const res = await fetch(`${BASE_URL}/api/comment`,{
    method: 'POST',
    body: JSON.stringify({id: placeId, content: comment})
  })
  return res.json()
}

// 식당 상세 페이지 이미지 DB에 저장
export const postDetailPlaceImage = async (placeId: string, file: File) => {
  const res = await fetch(`${BASE_URL}/api/image`)
  const {url, uuid} = await res.json()

  const fileType = file?.type

  const uploadRes = await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {'Content-TYpe': fileType}
  })

  if(uploadRes.ok) {
    const fileUrl = `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/${uuid}`
    const res = await fetch(`${BASE_URL}/api/image`,{
      method:'POST',
      body: JSON.stringify({id: placeId, url: fileUrl})
    })
    return res.json()
  }
}