export type AuthUser = {
  user_id: string,
  nickname: string,
  image?: string | null,
  profile_url?: string| null,
  created_date?: Date
}