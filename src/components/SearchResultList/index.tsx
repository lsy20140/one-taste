'use client'
import { useGetSearchResult } from "@/hooks/useSearch"
import { SimplePlace } from "@/model/place"
import Link from "next/link"
import OnePlaceListItem from "../OnePlaceListItem"
import { Key } from "react"

export default function SearchResultList({keyword}:{keyword: string}) {
  const {isLoading, places} = useGetSearchResult(keyword)

  return (
    <ul className="mt-4">
      {isLoading && <p>로딩중</p>}
      {
        places && places.map((place: SimplePlace, idx: Key) => (
          <Link key={idx} href={`/place/${place.place_id}/detail`}>
            <OnePlaceListItem place={place}/>
          </Link>
        ))
      }
    </ul>
  )
}
