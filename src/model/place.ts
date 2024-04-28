export type DetailPlace = {
  place_id: Number,
  name: string,
  address: string,
  content: string | null,
  opening_hours: OpeningHour | null,
  closed_days: string | null,
  phone: string | null,
  dibs_list: string[],
  comments:Comment[],
  images: Image[],
  cate_name: string
}

export type SimplePlace = Omit<DetailPlace, 'comments'>;

export type Comment = {
  content: string,
  user_id: string,
  created_date: Date
}

export type Image = {
  image_id: Number,
  rest_id: Number,
  image_url: string,
  created_date: Date,
  user_id: string,
  like_user_list: string[]
}

export type OpeningHour = {
  [key: string]: {
    time_range: string,
    break_time: string,
    last_order: string
  }
}

