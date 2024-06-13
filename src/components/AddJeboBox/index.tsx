'use client'

import { useEffect, useState } from "react"
import Input from "../common/Input"
import { JeboSearchPlace } from "@/model/place"
import Button from "../common/Button"
import { IoIosClose } from "react-icons/io";
import { removeTags } from "@/utils/removeTag"
import { ClipLoader } from "react-spinners"

export default function AddJeboBox() {
  const [input, setInput] = useState('')
  const [list, setList] = useState<JeboSearchPlace[]>([])
  const [showList, setShowList] = useState(false)
  const [jeboList, setJeboList] = useState<JeboSearchPlace[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)


  const handleChange = async (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    if(value){
      setIsSearching(true)
      const res = await fetch(`/api/search/local?query=${value}`)
      const data = await res.json()
      setList(data.items)
      setIsSearching(false)
    }
  }

  const handleAddJeboList= (place: any) => {
    const {title, roadAddress, category} = place
    const isDuplicate = jeboList.some((item) =>
      item.title === title &&
      item.roadAddress === roadAddress &&
      item.category === category
    )

    if(isDuplicate){
      alert("이미 추가되었습니다.")
      return
    }
    setJeboList((prev) => [...prev, {title: removeTags(place.title), roadAddress: place.roadAddress, category: place.category}])
    setShowList(false)
    setInput('')
  }

  const handleRemoveJeboList = (place: JeboSearchPlace) => {
    setJeboList((prev) => [...prev.filter((item) => item.title !== place.title)])
  }

  const handleSubmitJeboList = async () => {
    setIsSubmitLoading(true)
    const res = await fetch(`/api/jebo`, {
      method: 'POST',
      body: JSON.stringify({
        jeboList: jeboList
      })
    })
    setIsSubmitLoading(false)
    if(res.ok){
      alert("제보 완료! 검토 후 추가될 예정입니다.\n\n거부될 수 있는 경우는 다음과 같습니다. \n❌ 프랜차이즈 식당인 경우❌ \n❌ 맛이 없는 경우!!!!❌  ")
      setJeboList([])
      setInput('')
    }else{
      alert("오류 발생")
    }
  }


  useEffect(() => {
    setShowList(input.length ? true : false)
  },[input])

  return (
    <>
      <div className="w-full h-full flex justify-center mt-12">
        <div className="bg-white w-3/5 max-md:w-5/6 max-lg:h-fit h-1/2 min-h-96 p-8 rounded-xl flex flex-col justify-between z-40">
          <h2 className="font-semibold mb-1">맛집 제보하기</h2>
          <p className="text-neutral-400 text-sm">사람들에게 알리고 싶은 나만의 맛집을 제보해주세요!</p>
          <div className="flex flex-grow max-lg:flex-col gap-4 max-h-[calc(100%-52px)]">
            <div className="w-3/5 max-lg:w-full relative">
              <form className="flex items-center h-10 mt-3">
                <Input 
                  placeholder="식당 이름 또는 관련 키워드로 검색해보세요!" 
                  value={input}
                  onChange={handleChange} 
                />
              </form>
              {showList &&
                <div className="absolute w-full h-fit bg-white z-20 rounded-lg shadow-sm overflow-auto">
                  <ul className="text-left">
                    {list && list.length > 0 ? list.map((place, idx) => (
                      <li key={idx} onClick={() => handleAddJeboList(place)} className="flex p-2 gap-6 items-center hover:bg-neutral-50 cursor-pointer" >
                        {/* 선택한 장소 넘길 준비 */}
                        <p className="font-medium shrink-0">{removeTags(place.title)}</p>
                        <p className="text-sm text-neutral-500 shrink-0">{place.roadAddress}</p>
                      </li>
                    )) : <p className="p-2">검색 결과가 없습니다.</p>}
                  </ul>           
                  {isSearching && <div className="w-full text-center"><ClipLoader color="#ef4444"/></div>  }
                </div>
              }
            </div>
            <div className="w-2/5 max-lg:w-full max-lg:max-h-72 min-h-48 box-border flex flex-col">
              <h3 className="mb-2">📨 제보 리스트</h3>
              <div className="flex-grow overflow-auto max-lg:overflow-auto mb-2">
                {jeboList.length > 0 &&
                  jeboList.map((jebo, idx) => (
                    <li key={idx} className="flex justify-between bg-red-50 border-red-200 border-[1px] p-3 rounded-md mb-1 gap-1">
                      <div>
                        <p className="font-medium">{removeTags(jebo.title)}</p>
                        <p className="text-sm text-neutral-500">{jebo.roadAddress}</p>
                      </div>
                      <IoIosClose onClick={() => handleRemoveJeboList(jebo)} className="flex-shrink-0 text-neutral-600 cursor-pointer" fontSize={20}/>
                    </li>
                  ))
                }
              </div>  
              <div className="sticky bottom-0">
                <Button onClick={handleSubmitJeboList} bgColor={jeboList.length ? "red-500" : ""} textColor="white">
                  {isSubmitLoading ? <ClipLoader size={18} color="white"/> : <p>제보하기</p>}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
