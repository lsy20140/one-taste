import { FormEvent, useEffect, useState } from "react";
import Input from "../common/Input";
import { DetailPlace } from "@/model/place";
import { FaSearch } from "react-icons/fa"
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";


export default function SearchPlace() {
  const [input, setInput] = useState('')
  const [places, setPlaces] = useState<DetailPlace[]>([])
  const [showList, setShowList] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = async (e : React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setIsLoading(true)
    const res = await fetch(`/api/search/${e.target.value}/autocomplete`)
    const places = await res.json()
    setIsLoading(false)
    setPlaces(places)
  }


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    params.set('query', input)
    router.replace(`/search?${params}`)    
  }

  useEffect(() => {
    setShowList(input.length ? true : false)
  },[input])



  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center h-10">
        <Input 
          placeholder="식당 이름 또는 관련 키워드로 검색해보세요!" 
          value={input}
          onChange={handleChange} 
          onBlur={()=> setShowList(false)}
        />
        <button className="flex items-center absolute right-4 text-neutral-400" onClick={handleSubmit}>
          <FaSearch/>
        </button>
      </form>
      {showList &&  
        <div className="h-fit bg-white z-20 rounded-lg shadow-sm">
          {isLoading ? 
            <div className="py-4">
              <ClipLoader color="#ef4444" />
            </div>
            :
            <ul className="text-left">
              {places && places.map((place, idx) => (
                <Link key={idx} href={`/place/${place.place_id}/detail`}>
                  <li key={idx} className="flex p-3 gap-6 items-center hover:bg-neutral-50 cursor-pointer" >
                    <p className="font-medium">{place.name}</p>
                    <p className="text-neutral-500 text-sm">{place.content}</p>
                  </li>
                </Link>
              ))}
            </ul>
          }
        </div>
      }
    </div>
  )
}