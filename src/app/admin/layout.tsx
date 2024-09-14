import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-full text-black mt-14">
      <div className="flex justify-end px-4 py-1 gap-2">
        <Link href={"/admin"} className="p-2 bg-neutral-200 rounded">
          식당 전체 목록
        </Link>
        <Link href={"/admin/jebo"} className="p-2 bg-neutral-200 rounded">
          제보 관리
        </Link>
      </div>
      {children}
    </div>
  )
}
