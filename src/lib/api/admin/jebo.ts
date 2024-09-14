import { BASE_URL } from "@/constants"

export const getAllJebo = async () => {
  const res = await fetch(`${BASE_URL}/api/admin/jebo`)
  return res.json()
}
