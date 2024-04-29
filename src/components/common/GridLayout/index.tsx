export default function GridLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 m-auto justify-items-center">
        {children}
      </div>
    </>
  )
}
