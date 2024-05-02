import OnePlaceListItem from "@/components/OnePlaceListItem"
import { BASE_URL } from "@/constants"
import { SimplePlace } from "@/model/place"
import Link from "next/link"
import { Key } from "react"

async function getSearchPlaces(keyword: string) {
  const res = await fetch(`${BASE_URL}/api/search/${keyword}`, {
    method: 'GET'
  })
  return res.json()
}

type Props = {
  searchParams:{
    [key: string]: string
  }
}

export default async function SearchResult({searchParams}:Props) {
  const query = searchParams.query
  const places = await getSearchPlaces(query)
  
  return (
    <div className="w-full h-full flex justify-center bg-white overflow-auto">
      <div className="w-2/3 max-lg:w-4/5 max-xl:w-4/5 mt-12">
        <p><span className="font-semibold text-lg">"{query}" </span>에 대한 검색 결과</p>
        <ul className="mt-4">
          {
            places && places.map((place: SimplePlace, idx: Key) => (
              <Link key={idx} href={`/place/${place.place_id}/detail`}>
                <OnePlaceListItem place={place}/>
              </Link>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
