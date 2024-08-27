import CommentSection from "@/components/DetailPlace/CommentSection";
import ImageSection from "@/components/DetailPlace/ImageSection";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import {
  getDetailPlaceComments,
  getDetailPlaceImages,
  getDetailPlaceInfo,
} from "@/lib/api/place";
import InfoSection from "@/components/DetailPlace/InfoSection";

type Props = {
  params: {
    id: string;
  };
};

export default async function DetailPlacePage({ params: { id } }: Props) {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["place/info", id],
      queryFn: () => getDetailPlaceInfo(id),
    }),
    queryClient.prefetchQuery({
      queryKey: ["place/images", id],
      queryFn: () => getDetailPlaceImages(id),
    }),
    queryClient.prefetchQuery({
      queryKey: ["place/comments", id],
      queryFn: () => getDetailPlaceComments(id),
    }),
  ]);

  return (
    <>
      <div className="absolute top-0 w-full h-full bg-neutral-50 px-24 max-md:px-16 max-sm:px-0 overflow-y-auto z-[45]">
        <div className="max-w-3xl h-fit min-h-full mx-auto py-8 px-10 rounded-lg bg-white box-content">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <InfoSection placeId={id} />
          </HydrationBoundary>
          <ImageSection placeId={id} />
          <CommentSection placeId={id} />
        </div>
      </div>
    </>
  );
}
