import SearchResultList from "@/components/SearchResultList"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

type Props = {
  searchParams:{
    [key: string]: string
  }
}

export default async function SearchResultPage({searchParams}:Props) {
  const query = searchParams.query

  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryKey: ['searchResult', searchParams]
  })
  
  return (
    <div className="w-full h-full flex justify-center bg-white overflow-auto">
      <div className="w-2/3 max-lg:w-4/5 max-xl:w-4/5 mt-12">
        <p><span className="font-semibold text-lg">{`\"${query}\"`}</span>에 대한 검색 결과</p>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SearchResultList keyword={query}/>
        </HydrationBoundary>
      </div>
    </div>
  )
}
