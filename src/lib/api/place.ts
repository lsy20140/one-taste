// 식당 요약 정보 조회(지도 마커 클릭 시)
export const getSimplePlace = async (placeId: string) => {
  const res = await fetch(`/api/place/${placeId}`)
  return res.json()
}

// 식당 좋아요
export const updateLikePlace = async (placeId: string, like: Boolean) => {
  const res = await fetch(`/api/like`,{
    method: 'POST',
    body: JSON.stringify({id: placeId, like: like})
  })
  return res.json()
}