import { OpeningHour } from "@/model/place";

export const getDayOfWeek = () => {
  const today = new Date();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = weekdays[today.getDay()];

  return dayOfWeek
}

type Props = {
  opening_hours: OpeningHour,
  closed_days: string | null
}

export const getTodayOpeningHours = ({opening_hours, closed_days}: Props) => {
  let todayOpeningHours = ''
  const today = getDayOfWeek()

  if (opening_hours["매일"]) {
    todayOpeningHours = `매일 ${opening_hours["매일"].time_range}`;
  } else if (closed_days && closed_days.includes(today)) {
    todayOpeningHours = "오늘은 휴무일😱";
  } else {
    todayOpeningHours = `오늘 ${opening_hours[today].time_range}`
  }

  return todayOpeningHours
}