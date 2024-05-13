import { SimplePlace } from "@/model/place";
import { getTodayOpeningHours } from "@/utils/getTodayOpeningHours";
import Image from "next/image";
import { FcLeave, FcLock, FcPhone, FcShop } from "react-icons/fc";
import HeartButton from "../HeartButton";
import { useLikePlace } from "@/hooks/usePlace";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Props = {
  place: SimplePlace,
  keyword: string
}

export default function OnePlaceListItem({place, keyword}:Props) {
  const {data: session} = useSession()
  const userId = session?.user.user_id

  const {place_id, name,content, opening_hours, dibs_list, closed_days, phone, cate_name, address} = place

  const liked = dibs_list?.includes(userId!) as Boolean
  const {updateLike} = useLikePlace(place_id.toString(), !liked, keyword)

  const handleLike = () => {
    updateLike()
  }

  return (
    <div className="relative flex items-center justify-between w-full h-fit px-6 py-3 mb-3 rounded-lg max-sm:flex-col outline outline-1 outline-neutral-200 shadow-sm transition ease-in-out delay-150 hover:translate-x-1 hover:shadow-lg">
      <Link href={`/place/${place.place_id}/detail`} className="flex gap-2 items-center justify-between">
        <Image width={144} height={144} src={'/images/icon.svg'} alt="" className="mr-3 max-sm:mb-2"/>
        <div className="max-sm:flex flex-col items-center">
          <div className="flex gap-2 text-left items-center">
            <h2 className="font-semibold">{name}</h2>
            <span>{cate_name}</span>
          </div>
          <p>{content}</p>
        </div>
        <div className="grid justify-items-stretch grid-cols-2 min-md:flex min-md:flex-wrap gap-2 max-sm:gap-1 max-sm:mt-2">
          {opening_hours &&
            <div className="flex gap-2 items-center justify-center">
              <FcLock/>
              <span className="font-semibold">{getTodayOpeningHours({opening_hours, closed_days})}</span>
            </div>
          }
          <div className="flex gap-2 items-center justify-center">
            <FcLeave />
            <span className="font-semibold">{closed_days ? `${closed_days} 휴무` : '휴무 없음'}</span>
          </div>
          <div className="flex gap-2 items-center justify-center text-neutral-500">
            <FcPhone/>
            <span>{phone}</span>
          </div>
          <div className="flex gap-2 items-center justify-center text-neutral-500">
            <FcShop/>
            <span>{address}</span>
          </div>
        </div> 
      </Link>
      <div className="max-sm:absolute right-4 top-4">
        <HeartButton liked={liked} onLike={handleLike}/>
      </div>
    </div>
  )
}
