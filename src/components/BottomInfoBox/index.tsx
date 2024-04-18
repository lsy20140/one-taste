'use client'
import { SimplePlace } from "@/model/place"
import { getTodayOpeningHours } from "@/utils/getTodayOpeningHours"
import { useEffect, useState } from "react"
import Button from "../common/Button"
import { FcClock, FcLeave, FcPhone, FcShop } from "react-icons/fc";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { useModal } from "@/hooks/useModal"
import HeartButton from "../HeartButton"
import { useSession } from "next-auth/react"

export type Props = {
  selectedId?: Number
}

export default function BottomInfoBox(props: Props) {
  const {selectedId} = props
  const [info, setInfo] = useState<PlaceDetail>()  
  const {openModal} = useModal()
  const [info, setInfo] = useState<SimplePlace>() 
  
  const liked = info?.dibs_list?.includes(userId!) as Boolean

  const fetchData = async () => {
    const res = await fetch(`/api/place/${selectedId}`, {
      method: 'GET'
    })
    return res.json()
  }

  useEffect(() => {
    fetchData()
      .then((res: Array<SimplePlace>) => {
        setInfo(res[0])
      })
  },[])

  const handleClick = () => {
    if(selectedId){
      openModal({id: 'detail', props: {id: selectedId}})
      window.history.pushState(null, '', `/place/${selectedId}`)
    }
  }
  
  if(info) {
    const {name, address, content, opening_hours, closed_days, dibs_list, phone, cate_name} = info

    return (
      <>
          <div className="left-1/2 -translate-x-1/2 fixed bottom-8 z-50 w-[448px] max-h-[320px] flex flex-col gap-3 justify-between overflow-auto bg-white rounded-xl py-4 px-6 sm:mx-4 max-sm:max-w-80 max-sm:bottom-4">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <h1 className="font-bold">{name}</h1>
                  <span className="text-xs font-medium bg-red-50 rounded-full py-1 px-3 text-red-500">{cate_name}</span>
                </div>
                <HeartButton liked={liked}/>
              </div>  
              <p className="text-neutral-500 break-keep">{content}</p>
              <hr/>
            </div>
            <div className="flex flex-col gap-2 max-sm:gap-1">
              {opening_hours &&
                <div className="flex gap-2 items-center">
                  <FcClock/>
                  <span className="font-semibold">{getTodayOpeningHours({opening_hours, closed_days})}</span>
                </div>
              }
                <div className="flex gap-2 items-center">
                  <FcLeave />
                  <span className="font-semibold">{closed_days ? `${closed_days} 휴무` : '휴무 없음'}</span>
                </div>
              <div className="flex gap-2 items-center text-neutral-500">
                <FcShop/>
                <span>{address}</span>
              </div>
              <div className="flex gap-2 items-center text-neutral-500">
                <FcPhone/>
                <span>{phone}</span>
              </div>
            </div> 
            <Button text="자세히 보기" onClick={handleClick} color="black"/>          
          </div>
      </>
    )
  }
}
