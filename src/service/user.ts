import executeQuery from "@/lib/db";
import { AuthUser } from "@/model/user";

// 이미 존재하는 사용자인지 id로 확인
export async function checkIsExistUser(user_id: string) {
  const query =
    `
    SELECT COUNT(user_id) as isExist
    FROM user
    WHERE user_id = ${user_id}
  `

  const res = await executeQuery(query)
  return res
}

// db에 신규 사용자 추가
export async function addUser({ role, user_id, nickname, image }: AuthUser) {
  const query = `INSERT INTO user (role, user_id, nickname, profile_url, created_date) VALUES(?,?,?,?,?)`
  const res = await executeQuery(query, [role, user_id, nickname, image, new Date()])
  return res
}

export async function getUserRole(user_id: string) {
  const query = `SELECT role FROM user WHERE user_id = ${user_id}`
  const res = await executeQuery(query)
  return res
}