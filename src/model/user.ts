export type AuthUser = {
  user_id: string,
  nickname: string,
  profile_path: string | null,
  created_date?: Date
}