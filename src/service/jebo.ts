import executeQuery from "@/lib/db";
import { JeboSearchPlace } from "@/model/place";

export async function addJebo(jeboList: JeboSearchPlace[]) {
  if(jeboList.length > 0){
    const promises = jeboList.map(async(jebo) => {
      const {title, roadAddress} = jebo
      const query = `
        INSERT INTO jebo (jebo_id, name, address) VALUES (?,?,?)
      `
      const res = await executeQuery(query, [null, title, roadAddress])
      return res
    })
    const res = await Promise.all(promises)
    return res
  }
}