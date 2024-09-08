import { getAllPlaces } from "@/lib/api/admin/place";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPlaces = () => {
  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["places", "admin"],
    queryFn: () => getAllPlaces(),
  });

  return { data, error, isLoading, isFetched };
};
