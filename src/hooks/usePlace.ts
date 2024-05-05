import { queryClient } from "@/context/QueryClientProvider"
import { getSimplePlace, updateLikePlace } from "@/lib/api/place"
import { useMutation, useQuery } from "@tanstack/react-query"

// 식당 요약 정보 조회
export const useGetSimplePlace = (placeId: string) => {
  const {data, error, isLoading} = useQuery({
    queryKey: ['place', placeId],
    queryFn: () => getSimplePlace(placeId)
  })
  return {data, error, isLoading}
}

// 식당 좋아요 상태 변경
export const useLikePlace = (placeId: string, like: Boolean) => {
  const {data, error, mutate: updateLike} = useMutation({
    mutationFn: () => updateLikePlace(placeId, like),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['place', placeId]})
    }
  })

  return {data, error, updateLike}
}