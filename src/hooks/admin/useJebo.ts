import { getAllJebo } from '@/lib/api/admin/jebo'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '@/context/QueryClientProvider'
import { removeJeboItem } from '@/lib/api/admin/jebo'

export const useGetAllJebo = () => {
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ['jebo', 'admin'],
    queryFn: () => getAllJebo(),
  })

  return { data, error, isLoading, isFetched }
}

// 제보 목록에서 삭제
export const useRemoveJebo = (jebo_id: number) => {
  const {
    isPending,
    isSuccess: editSuccess,
    mutate: updateJebo,
  } = useMutation({
    mutationFn: () => removeJeboItem(jebo_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['jebo', 'admin'],
      })
    },
  })
  return { editSuccess, isPending, updateJebo }
}
