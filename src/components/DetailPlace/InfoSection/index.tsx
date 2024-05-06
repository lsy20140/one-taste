'use client'
import { useGetDetailPlaceInfo } from "@/hooks/usePlace";
import { getTodayOpeningHours } from "@/utils/getTodayOpeningHours";
import { FcLeave, FcLock, FcPhone, FcShop } from "react-icons/fc"

export default function InfoSection({placeId}: {placeId: string}) {
  const {data: info} = useGetDetailPlaceInfo(placeId)

  if(info) {
    const {name, address, content, opening_hours, closed_days, dibs_list, phone, cate_name} = info[0]

    return (
      <section>
        <div className="flex gap-2 items-center">
          <h1 className="font-bold">{name}</h1>
          <span className="text-xs font-medium bg-red-50 rounded-full py-1 px-3 text-red-500">{cate_name}</span>
        </div>
        <p className="text-neutral-500 break-keep mt-2">{content}</p>
        <div className="mt-8">
          <p className="text-neutral-700 text-lg">상세 정보</p>
          <hr className="mt-1"/> 
          <div className="flex flex-col gap-4 mt-2">
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
        </div>
      </section>
    )
  }

}
