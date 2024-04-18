import { useModal } from "@/hooks/useModal"
import { DetailPlace } from "@/model/place"
import { ChangeEvent, useEffect, useState } from "react"
import Header from "../common/Header"
import { FcClock, FcLeave, FcPhone, FcShop } from "react-icons/fc"
import { getTodayOpeningHours } from "@/utils/getTodayOpeningHours"

export type Props = {
  id?: Number
}

export default function PlaceDetailModal(props: Props) {
  const {id} = props
  const {closeModal} = useModal()
  const [detailInfo, setDetailInfo] = useState<DetailPlace>()
  const [file, setFile] = useState<File | null>(null)

  const fetchDetail = async () => {
    const res = await fetch(`/api/place/${id}/detail`, {
      method: 'GET'
    })
    return res.json()
  }

  useEffect(() => {
    fetchDetail().then((res: DetailPlace[]) => {
      setDetailInfo(res[0])
    })
    window.addEventListener("popstate", () => {
      closeModal()
    });
    }
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if(files && e.target.type === 'file'){
      setFile(files[0])
    }
  }

  const handleUploadImage = () => {
    // S3 버킷 업로드
  }


  if(detailInfo) {
    const {name, content, opening_hours, closed_days, cate_name, dibs_list, comments, phone, address} = detailInfo

    return (
      <>
        <div className="w-full fixed top-0 z-[50]">
          <Header/>
        </div>
        <div className='fixed bottom-0 w-full h-[calc(100vh-4rem)] bg-neutral-50 z-[45] px-24 max-md:px-16 max-sm:px-0'>
          <div className="max-w-3xl h-full mx-auto py-8 px-10 rounded-lg bg-white box-content">
            <h1 className="font-semibold">{name}</h1>
            <p className="text-neutral-500 break-keep mt-2">{content}</p>
            <div className="mt-8">
              <p className="text-neutral-700 text-lg">상세 정보</p>
              <hr className="mt-1"/> 
              <div className="flex flex-col gap-4 mt-2">
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
                  <FcPhone/>
                  <span>{phone}</span>
                </div>
                <div className="flex gap-2 items-center text-neutral-500">
                  <FcShop/>
                  <span>{address}</span>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <p className="text-neutral-700 text-lg">사진</p>
              <hr className="mt-1"/> 
              {/* 사진 리스트 */}
              <>
              </>
              <input id="file" type="file" onChange={(e) => handleChange(e)}/>
            </div>
            <div className="mt-10">
              <p className="text-neutral-700 text-lg">한줄평</p>
              <hr className="mt-1"/> 
              {/* 사용자들의 한줄평 리스트 보여주는 곳 */}
            </div>
          </div>
        </div>
      </>
    )
  }
}
