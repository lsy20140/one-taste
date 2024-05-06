import { BASE_URL } from "@/constants"

// 검색 결과 식당 목록 조회
export const getSearchResult = async (keyword: string) => {
  const res = await fetch(`${BASE_URL}/api/search/${keyword}`)
  return res.json()
}