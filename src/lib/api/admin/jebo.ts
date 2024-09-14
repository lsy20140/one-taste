import { BASE_URL } from '@/constants'

export const getAllJebo = async () => {
  const res = await fetch(`${BASE_URL}/api/admin/jebo`)
  return res.json()
}

export const removeJeboItem = async (jebo_id: any) => {
  const res = await fetch(`${BASE_URL}/api/admin/jebo`, {
    method: 'DELETE',
    body: JSON.stringify({
      jebo_id: jebo_id,
    }),
  })
  return res.json()
}
