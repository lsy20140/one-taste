export type PlaceDetail = {
  place_id: Number,
  name: string,
  address: string,
  content: string | null,
  opening_hours: OpeningHour | null,
  closed_days: string | null,
  phone: string | null,
  dibs_cnt: Number | 0;
  comments: Array<Comment>,
}

export type Comment = {
  content: string,
  user_id: string,
}

export type OpeningHour = {
  [key: string]: {
    time_range: string,
    break_time: string,
    last_order: string
  }
}