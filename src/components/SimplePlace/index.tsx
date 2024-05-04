'use client'
import { SimplePlace as SimplePlaceType } from "@/model/place";
import ModalBackground from "../common/ModalBackground";
import HeartButton from "../HeartButton";
import { FcLeave, FcLock, FcPhone, FcShop } from "react-icons/fc";
import Link from "next/link";
import { getTodayOpeningHours } from "@/utils/getTodayOpeningHours";
import Button from "../common/Button";
import { useSession } from "next-auth/react";
import { customRevalidateTag } from "@/utils/revalidateTag";

type Props = {
  id: string,
  info: SimplePlaceType
}

export default function SimplePlace({id, info}: Props) {
  const session = useSession()
  const userId = session.data?.user.user_id

  const {place_id, name, address, content, opening_hours, closed_days, dibs_list, phone, cate_name} = info
  const liked = info?.dibs_list?.includes(userId!) as Boolean

  const handleLike = async (like: Boolean) => {
    await fetch('/api/like',{
      method: 'POST',
      body: JSON.stringify({id: place_id, like: like})
    })
    customRevalidateTag(`/place/${place_id}`)
  }

  return (
    <>
        <ModalBackground/>
        <div className="left-1/2 -translate-x-1/2 fixed bottom-8 z-[40] w-[448px] max-h-[320px] flex flex-col gap-3 justify-between overflow-auto bg-white rounded-xl py-4 px-6 sm:mx-4 max-sm:max-w-80 max-sm:bottom-4">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <h1 className="font-bold">{name}</h1>
                <span className="text-xs font-medium bg-red-50 rounded-full py-1 px-3 text-red-500">{cate_name}</span>
              </div>
              <HeartButton onLike={handleLike} liked={liked}/>
            </div>  
            <p className="text-neutral-500 break-keep">{content}</p>
            <hr/>
          </div>
          <div className="flex flex-col gap-2 max-sm:gap-1">
            {opening_hours &&
              <div className="flex gap-2 items-center">
                <FcLock/>
                <span className="font-semibold">{getTodayOpeningHours({opening_hours, closed_days})}</span>
              </div>
            }
              <div className="flex gap-2 items-center">
                <FcLeave />
                <span className="font-semibold">{closed_days ? `${closed_days} 휴무` : '휴무 없음'}</span>
              </div>
              <div className="flex gap-2 items-center text-neutral-500">
                <FcPhone/>
                <span>{phone}</span>
              </div>
              <div className="flex gap-2 items-center text-neutral-500">
                <FcShop/>
                <span>{address}</span>
              </div>
          </div> 
          <Link href={`/place/${id}/detail`}>
            <Button text="자세히 보기" color="black"/>        
          </Link>
        </div>
    </>
  )
}
