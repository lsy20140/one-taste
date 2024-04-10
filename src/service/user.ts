import executeQuery from "@/lib/db";
import { AuthUser } from "@/model/user";

export async function addUser({user_id, nickname, profile_path, email}: AuthUser) {
  const query = `INSERT INTO user (user_id, nickname, profile_path, created_date, email) VALUES(?,?,?,?,?)`
  const res = await executeQuery(query, [user_id, nickname, profile_path, new Date(), email])
  console.log("res", res)
}