import { getSearchResult } from "@/lib/api/search"
import { useQuery } from "@tanstack/react-query"

// 식당 요약 정보 조회
export const useGetSearchResult = (keyword: string) => {
  const {data: places, error, isLoading} = useQuery({
    queryKey: ['searchResult', keyword],
    queryFn: () => getSearchResult(keyword)
  })
  return {places, error, isLoading}
}