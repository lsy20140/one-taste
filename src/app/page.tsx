import { getAllPlaces } from "@/lib/api/place";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"))

export default function Home() {
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: ['places']
  })

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Map/>
      </HydrationBoundary>
    </>
  );
}
