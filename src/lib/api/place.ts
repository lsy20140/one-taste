import { BASE_URL } from "@/constants"

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