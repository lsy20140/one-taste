export type DetailPlace = {
  place_id: Number,
  name: string,
  address: string,
  content: string | null,
  opening_hours: OpeningHour | null,
  closed_days: string | null,
  phone: string | null,
  dibs_list: string[],
  comments: Array<Comment>,
  cate_name: string
}

export type SimplePlace = Omit<DetailPlace, 'comments'>;

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

