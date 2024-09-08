export const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

export const getDayOfWeek = () => {
  const today = new Date();
  const dayOfWeek = weekdays[today.getDay()];

  return dayOfWeek;
};

type Props = {
  opening_hours: string;
  closed_days: string | null;
};

export const getTodayOpeningHours = ({ opening_hours, closed_days }: Props) => {
  let todayOpeningHours = "";
  const today = getDayOfWeek();
  let time = JSON.parse(opening_hours);
  console.log(time);

  if (time["매일"]) {
    todayOpeningHours = `매일 ${time["매일"].time_range}`;
  } else if (closed_days && closed_days.includes(today)) {
    todayOpeningHours = "오늘은 휴무일😱";
  } else {
    todayOpeningHours = `오늘 ${time[today].time_range}`;
  }

  return todayOpeningHours;
};
