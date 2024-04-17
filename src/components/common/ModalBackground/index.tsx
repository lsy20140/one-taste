import { useModal } from '@/hooks/useModal'

export default function ModalBackground({children}: {children: React.ReactNode}) {
  const { closeModal} = useModal()

  return (
    <>
      <div 
        onClick={closeModal} 
        className='absolute w-full h-full bg-black bg-opacity-35 z-40 '
      />
      {children}
    </>
  )
}
