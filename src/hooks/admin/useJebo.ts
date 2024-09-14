import { getAllJebo } from "@/lib/api/admin/jebo"
import { useQuery } from "@tanstack/react-query"

export const useGetAllJebo = () => {
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["jebo", "admin"],
    queryFn: () => getAllJebo(),
  })

  return { data, error, isLoading, isFetched }
}
