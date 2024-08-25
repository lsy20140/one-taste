import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  return (
    <div>AdminPage</div>
  )
}
