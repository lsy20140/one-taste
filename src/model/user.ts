export type AuthUser = {
  user_id: string,
  email: string,
  nickname: string,
  profile_path: string | null,
  created_date?: Date
}