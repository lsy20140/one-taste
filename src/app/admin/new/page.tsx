'use client'
import Row from '@/components/FormRow'
import Label from '@/components/Label'
import Textarea from '@/components/Textarea'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { AdminPlaceInfo } from '@/model/place'
import { weekdays } from '@/utils/getTodayOpeningHours'
import { useState } from 'react'
import 'rc-time-picker/assets/index.css'
import { CATEGORIES } from '@/constants/category'
import TimePickerGroup from '@/components/TimePickerGroup'

export default function AdminNewPlacePage() {
  const [info, setInfo] = useState<
    Omit<AdminPlaceInfo, 'place_id' | 'closed_days' | 'cate_name'> & {
      closed_days: Array<string>
      cate_id: number
    }
  >({
    name: '',
    address: '',
    content: '',
    opening_hours: '',
    closed_days: [],
    phone: '',
    cate_id: 1,
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target

    if (name === 'closed_days') {
      if (info.closed_days?.includes(value)) {
        let new_days = info.closed_days.filter((item) => item !== value)
        setInfo((prev) => ({ ...prev, closed_days: new_days }))
      } else {
        setInfo((prev) => ({
          ...prev,
          closed_days: [...info.closed_days, value],
        }))
      }
    } else {
      setInfo((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async () => {
    // const res = await fetch(`/api/admin/place`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     placeInfo: info,
    //   }),
    // })
    // if (res.ok) {
    //   alert('추가 완료')
    // } else {
    //   alert('오류 발생')
    // }
  }

  const hasEmptyField = () => {
    const { name, address, content, opening_hours, phone } = info
    if (
      name === '' ||
      address === '' ||
      content == '' ||
      opening_hours === '' ||
      phone === ''
    ) {
      return true
    }
    return false
  }

  return (
    <div className='h-fit mx-80 max-lg:mx-4 pb-6'>
      <p className='text-xl font-semibold mb-6'>식당 추가</p>
      <div className='flex flex-col gap-8'>
        <Row>
          <Label>매장명</Label>
          <Input name='name' value={info.name ?? ''} onChange={handleChange} />
        </Row>
        <Row>
          <Label>설명 </Label>
          <Textarea
            name='content'
            value={info.content ?? ''}
            onChange={handleChange}
            className='bg-white'
          />
        </Row>
        <Row>
          <Label>주소 </Label>
          <Textarea
            name='address'
            value={info.address ?? ''}
            onChange={handleChange}
            className='bg-white'
          />
        </Row>
        <Row>
          <Label>휴무일</Label>
          <div className='flex gap-4'>
            {weekdays.map((day, idx) => (
              <div key={idx} className='flex flex-col gap-1 items-center'>
                <p>{day}</p>
                <input
                  type='checkbox'
                  name='closed_days'
                  value={day}
                  checked={info.closed_days.includes(day)}
                  onChange={handleChange}
                  className="appearance-none w-5 h-5 rounded bg-white cursor-pointer outline outline-1 outline-neutral-200 checked:bg-[url('/images/check.svg')] checked:outline-none bg-no-repeat bg-center checked:bg-red-500"
                />
              </div>
            ))}
          </div>
        </Row>
        <Row>
          <Label>영업시간</Label>
          <div className='flex flex-col gap-2 mb-6'>
            <p>매일</p>
            <TimePickerGroup
              day='매일'
              disabled={info.closed_days.length > 0}
              setInfo={setInfo}
            />
          </div>
          <div className='flex justify-around gap-3'>
            {weekdays.map((day, idx) => (
              <div key={idx} className='flex flex-col gap-2'>
                <p className='font-semibold pb-1 border-b border-b-neutral-300'>
                  {day}
                </p>
                <TimePickerGroup
                  day={day}
                  disabled={
                    info.closed_days.includes(day) ||
                    info.closed_days.length === 0
                  }
                  setInfo={setInfo}
                />
              </div>
            ))}
          </div>
        </Row>
        <Row>
          <Label>전화번호</Label>
          <Input
            name='phone'
            value={info.phone ?? ''}
            onChange={handleChange}
            placeholder='- 포함 (ex 02-1234-5678)'
          />
        </Row>
        <Row>
          <Label>카테고리</Label>
          <select
            name='cate_id'
            className='max-w-36 outline outline-neutral-200 outline-[1px] rounded p-2'
            onChange={handleChange}
            value={info.cate_id}
          >
            {CATEGORIES.map((item, idx) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </Row>

        <Button
          bgColor={hasEmptyField() ? 'disabled' : 'black'}
          textColor='white'
          onClick={handleSubmit}
        >
          식당 등록
        </Button>
      </div>
    </div>
  )
}
