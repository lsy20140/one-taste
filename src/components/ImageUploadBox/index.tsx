'use client'

import Image from "next/image"
import { ChangeEvent, useState } from "react"
import Button from "../common/Button"
import { usePathname } from "next/navigation"
import { ClipLoader } from "react-spinners"

export default function ImageUploadBox() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const pathname = usePathname()
  const id = pathname.split('/')[2]

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
    setIsUploading(true)
    const res = await fetch(`/api/image`)
    const {url, uuid} = await res.json()
    
    if(!file) return
    const fileType = file?.type
    const uploadRes = await fetch(url,{
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': fileType }
    })

    if(uploadRes.ok) {
      const fileUrl = `${process.env.NEXT_PUBLIC_AWS_BUCKET_URL}/${uuid}`
      const res = await fetch('/api/image',{
        method: 'POST',
        body: JSON.stringify({id: id, url: fileUrl})
      })
      if(res.ok) {
        setFile(null)
        setIsUploading(false)
      }
    }else{
      setIsUploading(false)
    }
  }

  return (
    <>
      <div className="relative w-full h-full flex justify-center">
        {!file &&
          <label htmlFor="file" className="absolute flex justify-center items-center w-36 h-36 overflow-hidden border-2 border-dashed border-neutral-300 rounded-lg">
            <input id="file" type="file" className="absolute inset-0 opacity-0 z-10 cursor-pointer" onChange={(e) => handleChange(e)}/>
            <span className="absolute inset-0 flex justify-center items-center text-gray-600">
              사진 업로드
            </span>
          </label>
        }
        {file &&
          <div className="w-36 h-36 absolute flex flex-col">
            <Image src={URL.createObjectURL(file)} fill alt="image"/>
            <div className="w-full absolute bottom-1 px-1">
              <Button text="저장" color="red" onClick={(e) => handleUploadImage(e)} size="small"/>
            </div>
          </div>
        }
        {isUploading &&
          <div className="flex justify-center items-center">
            <div className="absolute flex justify-center w-36 h-36 bg-black bg-opacity-50 rounded-lg"/>
            <ClipLoader color="#ef4444"/>
          </div>
        }
      </div>
    </>
  )
}
