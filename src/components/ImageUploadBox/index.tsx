'use client'

import Image from "next/image"
import { ChangeEvent, useEffect, useState } from "react"
import Button from "../common/Button"
import { usePathname } from "next/navigation"
import { ClipLoader } from "react-spinners"
import { usePostImage } from "@/hooks/usePlace"

export default function ImageUploadBox() {
  const [file, setFile] = useState<File | null>(null)
  const pathname = usePathname()
  const id = pathname.split('/')[2]
  const {isPending, uploadSuccess, addImage}  = usePostImage(id)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if(files && e.target.type === 'file'){
      if(files[0].size>1048576){
        alert("10MB 이하의 이미지만 업로드 가능합니다!")
        return
      }
      setFile(files[0])
    }
  }

  const handleUploadImage = async(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    if(!file) return
    addImage(file)
  }

  useEffect(() => {
    if(uploadSuccess){
      setFile(null)
    }
  },[uploadSuccess])

  return (
    <>
      <div className="relative w-36 h-36 flex justify-center">
        {!file &&
          <label htmlFor="file" className="absolute flex justify-center items-center w-36 h-36 overflow-hidden border-2 border-dashed border-neutral-300 rounded-lg z-[45]">
            <input id="file" type="file" className="absolute inset-0 opacity-0 z-10 cursor-pointer" onChange={(e) => handleChange(e)}/>
            <span className="absolute inset-0 flex justify-center items-center text-gray-600">
              사진 업로드
            </span>
          </label>
        }
        {file &&
          <div className="w-36 h-36 absolute flex flex-col overflow-hidden">
            <Image src={URL.createObjectURL(file)} fill alt="image" className="rounded-lg"/>
            <div className="w-full absolute bottom-1 px-1 z-[50]">
              <Button bgColor="red-500" textColor="white" onClick={(e) => handleUploadImage(e)} size="small">
                <p>저장</p>
              </Button>
            </div>
          </div>
        }
        {isPending &&
          <div className="w-36 h-36 relative flex justify-center items-center z-[55]">
            <div className="absolute inset-0 flex justify-center w-36 h-36 bg-black bg-opacity-50 rounded-lg"/>
            <ClipLoader color="#ef4444"/>
          </div>
        }
      </div>
    </>
  )
}
