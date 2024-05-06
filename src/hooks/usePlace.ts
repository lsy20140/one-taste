import { queryClient } from "@/context/QueryClientProvider"
import { postComment } from "@/lib/api/comment"
import { getDetailPlaceComments, getDetailPlaceImages, getDetailPlaceInfo, getSimplePlace, updateLikePlace } from "@/lib/api/place"
import { useMutation, useQueries, useQuery } from "@tanstack/react-query"

// 식당 요약 정보 조회
export const useGetSimplePlace = (placeId: string) => {
  const {data, error, isLoading} = useQuery({
    queryKey: ['place', placeId],
    queryFn: () => getSimplePlace(placeId),
  })
  return {data, error, isLoading}
}

// 식당 상세 정보 조회
export const useGetDetailPlaceInfo = (placeId: string) => {
  const {data, error, isLoading} = useQuery({
    queryKey: ['place/info', placeId],
    queryFn: () => getDetailPlaceInfo(placeId),
  })
  return {data, error, isLoading}
}

// 식당 상세 페이지 이미지 전체 조회
export const useGetDetailPlaceImages = (placeId: string) => {
  const {data, error, isLoading} = useQuery({
    queryKey: ['place/images', placeId],
    queryFn: () => getDetailPlaceImages(placeId),
  })
  return {data, error, isLoading}
}


// 식당 상세 페이지 한줄평 전체 조회
export const useGetDetailPlaceComments = (placeId: string) => {
  const {data, error, isLoading} = useQuery({
    queryKey: ['place/comments', placeId],
    queryFn: () => getDetailPlaceComments(placeId),
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

// 식당 상세 페이지 한줄평 추가
export const useAddComment = (placeId: string) => {
  const {data, error, isPending, mutate: addComment} = useMutation({
    mutationFn: (comment: string) => postComment(placeId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['place/comments',placeId]})
    }
  })
  return {data, error, isPending, addComment}
}