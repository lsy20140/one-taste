import executeQuery from "@/lib/db"

export async function getAllJebo() {
  const query = `
    SELECT * FROM jebo
  `
  const res = await executeQuery(query)
  return res
}
