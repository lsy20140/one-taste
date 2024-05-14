import executeQuery from "@/lib/db";
import { AuthUser } from "@/model/user";

export async function addUser({user_id, nickname, image}: AuthUser) {
  const query = `INSERT INTO user (user_id, nickname, profile_url, created_date) VALUES(?,?,?,?)`
  const res = await executeQuery(query, [user_id, nickname, image, new Date()])
  return res
}