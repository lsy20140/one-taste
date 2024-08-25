export type AuthUser = {
  role: 'admin' | 'user',
  user_id: string,
  nickname: string,
  image: string,
  profile_url?: string,
  created_date?: Date
}