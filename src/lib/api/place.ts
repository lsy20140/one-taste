// 식당 요약 정보 조회(지도 마커 클릭 시)
export const getSimplePlace = async (placeId: string) => {
  const res = await fetch(`/api/place/${placeId}`)
  return res.json()
}

