import executeQuery from "@/lib/db"

// 제보 목록 전체 조회
export async function getAllJebo() {
  const query = `
    SELECT * FROM jebo
  `
  const res = await executeQuery(query)
  return res
}

// 제보 목록에서 삭제
export async function removeJeboItem(id: number) {
  const query = `
    DELETE FROM jebo WHERE jebo_id = ${id};
  `
  const res = await executeQuery(query)
  return res
}
