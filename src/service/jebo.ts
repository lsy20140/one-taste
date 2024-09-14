import executeQuery from "@/lib/db"
import { JeboSearchPlace } from "@/model/place"

// 사용자 제보 기능
export async function addJebo(jeboList: JeboSearchPlace[]) {
  if (jeboList.length > 0) {
    const promises = jeboList.map(async (jebo) => {
      const { title, roadAddress, link } = jebo
      const query = `
        INSERT INTO jebo (jebo_id, name, address, link) VALUES (?,?,?,?)
      `
      const res = await executeQuery(query, [null, title, roadAddress, link])
      return res
    })
    const res = await Promise.all(promises)
    return res
  }
}
