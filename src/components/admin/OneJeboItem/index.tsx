import { useRemoveJebo } from '@/hooks/admin/useJebo'
import { JeboPlace } from '@/model/place'
import { IoIosClose } from 'react-icons/io'

export default function OneJeboItem({ jebo }: { jebo: JeboPlace }) {
  const { jebo_id, name, address, link } = jebo
  const { editSuccess, isPending, updateJebo } = useRemoveJebo(jebo_id)
  return (
    <div className='w-full max-w-3xl px-6 py-4 flex justify-between items-center rounded outline outline-1 outline-gray-200 text-black'>
      <div className='flex flex-col gap-1'>
        <p className='font-semibold'>{name}</p>
        <p>{address}</p>
        <p onClick={() => window.open(link)} className='cursor-pointer'>
          {link}
        </p>
      </div>
      <IoIosClose
        onClick={() => updateJebo()}
        className='flex-shrink-0 text-neutral-600 cursor-pointer'
        fontSize={20}
      />
    </div>
  )
}
