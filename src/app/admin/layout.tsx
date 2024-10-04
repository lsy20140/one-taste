import Link from 'next/link'

const MENUS = [
  {
    text: '식당 전체 목록',
    path: '/admin',
  },
  {
    text: '식당 추가',
    path: '/admin/new',
  },
  {
    text: '제보 관리',
    path: '/admin/jebo',
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='w-full h-full text-black overflow-y-auto'>
      <div className='flex justify-end mt-14 px-4 py-1 gap-2'>
        {MENUS.map((menu, idx) => (
          <Link
            key={idx}
            href={menu.path}
            className='p-2 bg-neutral-200 hover:bg-neutral-300 hover:font-semibold rounded'
          >
            {menu.text}
          </Link>
        ))}
      </div>
      {children}
    </div>
  )
}
