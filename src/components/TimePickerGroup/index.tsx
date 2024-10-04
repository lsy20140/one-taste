import TimePicker from 'rc-time-picker'
import Row from '../FormRow'
import { useEffect, useState } from 'react'
import moment from 'moment'

export default function TimePickerGroup({
  day,
  disabled,
  setInfo,
}: {
  day: string
  disabled: boolean
  setInfo: any
}) {
  const [time, setTime] = useState({
    time_range: { start: null, end: null },
    break_time: { start: null, end: null },
    last_order: null,
  })

  const handleChange = (name: string, value: moment.Moment) => {
    if (name === 'last_order') {
      setTime((prev: any) => ({
        ...prev,
        ['last_order']: value,
      }))
    } else {
      const [group, type] = name.split('-')
      setTime((prev: any) => ({
        ...prev,
        [group]: {
          ...prev[group],
          [type]: value,
        },
      }))
    }
  }
  useEffect(() => {
    setInfo((prev: any) => ({
      ...prev,
      ['opening_hours']: { ...prev['opening_hours'], [day]: time },
    }))
  }, [time])
  return (
    <div className='flex flex-col gap-4'>
      <Row>
        <label>영업시간</label>
        <div className='flex gap-1'>
          <TimePicker
            disabled={disabled}
            className='*:w-20'
            minuteStep={15}
            showSecond={false}
            name='time_range-start'
            onChange={(value) => handleChange('time_range-start', value)}
            value={time.time_range.start ?? undefined}
          />
          ~
          <TimePicker
            disabled={disabled}
            className='*:w-20'
            minuteStep={15}
            showSecond={false}
            name='time_range-end'
            onChange={(value) => handleChange('time_range-end', value)}
            value={time.time_range.end ?? undefined}
          />
        </div>
      </Row>
      <Row>
        <label>브레이크 타임</label>
        <div className='flex gap-1'>
          <TimePicker
            disabled={disabled}
            className='*:w-20'
            minuteStep={15}
            showSecond={false}
            name='break_time-start'
            onChange={(value) => handleChange('break_time-start', value)}
            value={time.break_time.start ?? undefined}
          />
          ~
          <TimePicker
            disabled={disabled}
            className='*:w-20'
            minuteStep={15}
            showSecond={false}
            name='break_time-end'
            onChange={(value) => handleChange('break_time-end', value)}
            value={time.break_time.end ?? undefined}
          />
        </div>
      </Row>
      <Row>
        <label>라스트 오더</label>
        <div className='flex gap-1'>
          <TimePicker
            disabled={disabled}
            className='*:w-20'
            minuteStep={15}
            showSecond={false}
            name='last_order'
            onChange={(value) => handleChange('last_order', value)}
            value={time.last_order ?? undefined}
          />
        </div>
      </Row>
    </div>
  )
}
