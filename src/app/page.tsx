import FloatingButton from "@/components/FloatingButton";
import { getAllPlaces } from "@/lib/api/place";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {ssr: false})

export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['places'],
    queryFn: getAllPlaces
  })

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Map/>
      </HydrationBoundary>
      <FloatingButton />
    </>
  );
}
