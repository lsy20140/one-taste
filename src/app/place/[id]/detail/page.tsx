import CommentSection from "@/components/DetailPlace/CommentSection"
import ImageSection from "@/components/DetailPlace/ImageSection"
import InfoSection from "@/components/DetailPlace/InfoSection"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

type Props = {
  params:{
    id: string
  }
}

export default async function DetailPlacePage({params: { id }}: Props) {
  const queryClient = new QueryClient()
  
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['place/info', id]
    }),
    queryClient.prefetchQuery({
      queryKey: ['place/images', id]
    }),
    queryClient.prefetchQuery({
      queryKey: ['place/comments', id]
    })
  ]);

  return (
    <>
      <div className='absolute top-16 w-full h-[calc(100vh-64px)] bg-neutral-50 px-24 max-md:px-16 max-sm:px-0 overflow-y-auto'>
        <div className="max-w-3xl h-fit min-h-full mx-auto py-8 px-10 rounded-lg bg-white box-content">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <InfoSection placeId={id}/>
            <ImageSection placeId={id}/>
            <CommentSection placeId={id}/>
          </HydrationBoundary>
        </div>
      </div>
    </>
  )
}
