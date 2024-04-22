'use client'

import Image from "next/image"
import { ChangeEvent, useState } from "react"
import Button from "../common/Button"
import { usePathname } from "next/navigation"

export default function ImageUploadBox() {
  const [file, setFile] = useState<File | null>(null)
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
        alert("업로드 성공")
      }
    }else{
      alert("업로드 실패")
    }
  }

  return (
    <>
      <input id="file" type="file" onChange={(e) => handleChange(e)}/>
      {file &&
        <div className="w-36 h-36 flex flex-col relative">
          <Image src={URL.createObjectURL(file)} fill alt="image"/>
          <div className="w-full absolute bottom-1 px-1">
            <Button text="저장" color="red" onClick={(e) => handleUploadImage(e)} size="small"/>
          </div>
        </div>
      }
    </>
  )
}
