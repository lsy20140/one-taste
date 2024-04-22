import { DetailPlace as DetailPlaceType } from "@/model/place"
import Header from "../common/Header"
import { FcLeave, FcLock, FcPhone, FcShop } from "react-icons/fc"
import { getTodayOpeningHours } from "@/utils/getTodayOpeningHours"
import ImageGrid from "../ImageGrid"
import CommentsList from "../CommentsList"

type Props = {
  info: DetailPlaceType
}

export default function DetailPlace({info}: Props) {
  const {name, address, content, opening_hours, closed_days, dibs_list, phone, cate_name, comments, images} = info

  return (
    <>
      <div className="w-full fixed top-0 z-[50]">
        <Header/>
      </div>
      <div className='fixed bottom-0 w-full h-[calc(100vh-4rem)] bg-neutral-50 z-[45] px-24 max-md:px-16 max-sm:px-0 overflow-y-auto'>
        <div className="max-w-3xl h-full mx-auto py-8 px-10 rounded-lg bg-white box-content">
          <div className="flex gap-2 items-center">
            <h1 className="font-bold">{name}</h1>
            <span className="text-xs font-medium bg-red-50 rounded-full py-1 px-3 text-red-500">{cate_name}</span>
          </div>
          {/* 상세 정보 */}
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
          <div className="mt-12">
            <p className="text-neutral-700 text-lg">사진</p>
            <hr className="mt-1"/> 
            {/* 사진 리스트 */}
            <ImageGrid images={images} />
          </div>
          <div className="mt-12">
            <p className="text-neutral-700 text-lg">한줄평</p>
            <hr className="mt-1"/> 
            {/* 한줄평 리스트 */}
            <CommentsList comments={comments}/>
          </div>
        </div>
      </div>
    </>
  )
}
