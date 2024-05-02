export default function GridLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:grid-cols-2 m-auto justify-items-center">
        {children}
      </div>
    </>
  )
}
