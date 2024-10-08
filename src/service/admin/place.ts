import executeQuery from '@/lib/db'
import moment from 'moment'

export async function getAllPlaces() {
  const query = `
    SELECT 
      p.place_id,
      p.name,
      p.address,
      p.content,
      p.opening_hours,
      p.closed_days,
      p.phone,
      cate.cate_name 
    FROM
      place as p
    JOIN category as cate 
      ON cate.cate_id = p.cate_id
  `
  const res = await executeQuery(query)
  return res
}

export async function addNewPlace(info: any) {
  const query = `
    INSERT INTO place (place_id, name, content, address, opening_hours, closed_days, phone, like_cnt, comment_cnt, cate_id) VALUES(?,?,?,?,?,?,?,?,?,?)
  `
  const { name, content, address, opening_hours, closed_days, phone, cate_id } =
    info
  const res = await executeQuery(query, [
    null,
    name,
    content,
    address,
    formatScheduleData(opening_hours),
    closed_days.join(''),
    phone,
    0,
    0,
    Number(cate_id),
  ])
  return res
}

export function formatScheduleData(schedule: any) {
  const formattedData = {} as any

  Object.keys(schedule).forEach((day: any) => {
    const dayData = schedule[day]
    const formattedDayData = {} as any

    if (dayData.time_range.start && dayData.time_range.end) {
      formattedDayData.time_range = `${moment(dayData.time_range.start).format(
        'HH:mm'
      )}~${moment(dayData.time_range.end).format('HH:mm')}`
    }

    if (dayData.break_time.start && dayData.break_time.end) {
      formattedDayData.break_time = `${moment(dayData.break_time.start).format(
        'HH:mm'
      )}~${moment(dayData.break_time.end).format('HH:mm')}`
    }

    if (dayData.last_order) {
      formattedDayData.last_order = moment(dayData.last_order).format('HH:mm')
    }

    // formattedDayData에 내용이 있으면 해당 요일을 추가
    if (Object.keys(formattedDayData).length > 0) {
      formattedData[day] = formattedDayData
    }
  })
  return JSON.stringify(formattedData)
}
