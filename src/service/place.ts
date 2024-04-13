import executeQuery from "@/lib/db"

export async function getAllPlaces() {
  const query = 'SELECT * from place'
  const res = await executeQuery(query)
  return res
}