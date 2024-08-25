import { queryClient } from "@/context/QueryClientProvider";
import {
  getAllPlaces,
  getDetailPlaceComments,
  getDetailPlaceImages,
  getDetailPlaceInfo,
  getSimplePlace,
  postComment,
  postDetailPlaceImage,
  updateLikePlace,
} from "@/lib/api/place";
import { useMutation, useQuery } from "@tanstack/react-query";

// 지도 위 전체 식당 리스트 조회
export const useGetAllPlaces = () => {
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["places"],
    queryFn: () => getAllPlaces(),
  });

  const refetch = async () => {
    const freshData = await queryClient.fetchQuery({
      queryKey: ["places"],
      queryFn: getAllPlaces,
    });
    return freshData;
  };

  return { data, error, isLoading, refetch };
};

// 식당 요약 정보 조회
export const useGetSimplePlace = (placeId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["place", placeId],
    queryFn: () => getSimplePlace(placeId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { data, error, isLoading };
};

// 식당 상세 정보 조회
export const useGetDetailPlaceInfo = (placeId: string) => {
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["place/info", placeId],
    queryFn: () => getDetailPlaceInfo(placeId),
  });
  return { data, error, isLoading, isFetched };
};

// 식당 상세 페이지 이미지 전체 조회
export const useGetDetailPlaceImages = (placeId: string) => {
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["place/images", placeId],
    queryFn: () => getDetailPlaceImages(placeId),
  });
  return { data, error, isLoading, isFetched };
};

// 식당 상세 페이지 한줄평 전체 조회
export const useGetDetailPlaceComments = (placeId: string) => {
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["place/comments", placeId],
    queryFn: () => getDetailPlaceComments(placeId),
  });
  return { data, error, isLoading, isFetched };
};

// 식당 좋아요 상태 변경
export const useLikePlace = (
  placeId: string,
  like: Boolean,
  keyword?: string
) => {
  const {
    data,
    error,
    mutate: updateLike,
  } = useMutation({
    mutationFn: () => updateLikePlace(placeId, like),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["place", placeId] }),
        queryClient.invalidateQueries({ queryKey: ["searchResult", keyword] });
    },
  });

  return { data, error, updateLike };
};

// 식당 상세 페이지 한줄평 추가
export const useAddComment = (placeId: string) => {
  const {
    data,
    error,
    isPending,
    mutate: addComment,
  } = useMutation({
    mutationFn: (comment: string) => postComment(placeId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["place/comments", placeId] });
    },
  });
  return { data, error, isPending, addComment };
};

// 식당 상세 페이지 이미지 업로드
export const usePostImage = (placeId: string) => {
  const {
    isPending,
    isSuccess: uploadSuccess,
    mutate: addImage,
  } = useMutation({
    mutationFn: (file: File) => postDetailPlaceImage(placeId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["place/images", placeId] });
    },
  });
  return { uploadSuccess, isPending, addImage };
};
