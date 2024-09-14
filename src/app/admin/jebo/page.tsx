import JeboList from "@/components/admin/JeboList"

export default function AdminJeboPage() {
  return (
    <div className="h-full overflow-y-auto px-48">
      <p className="text-lg font-semibold mb-2">제보 목록</p>
      <JeboList />
    </div>
  )
}
