"use client"
import { useGetSearchResult } from "@/hooks/useSearch"
import { SimplePlace } from "@/model/place"
import OnePlaceListItem from "../OnePlaceListItem"
import { Key } from "react"
import BaseSkeleton from "../Skeleton/BaseSkeleton"

export default function SearchResultList({ keyword }: { keyword: string }) {
  const { isLoading, isFetched, places } = useGetSearchResult(keyword)

  return (
    <ul className="mt-4">
      {isLoading && (
        <div className="flex flex-col gap-4">
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <BaseSkeleton key={idx} size="2xl" />
            ))}
        </div>
      )}
      {isFetched && (
        <>
          {places &&
            places.map((place: SimplePlace, idx: Key) => (
              <OnePlaceListItem key={idx} place={place} keyword={keyword} />
            ))}
        </>
      )}
    </ul>
  )
}
