export default function InfoSectionSkeleton() {
  const array = new Array(4).fill(0)
  const baseStyle = 'bg-skeleton rounded-md'

  return (
    <>
    <div>
      <div className={`${baseStyle} w-60 h-8`}/>
      <div className={`${baseStyle} w-1/2 h-6 mt-2`}/>
      <ul className="flex flex-col gap-4 mt-8">
        {array.map((_, idx) => (
          <p key={idx} className={`${baseStyle} w-1/3 h-6`}/>
        ))}
      </ul>
    </div>
    </>
  )
}
