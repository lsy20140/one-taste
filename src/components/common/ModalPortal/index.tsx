'use client'
import { useModal } from '@/hooks/useModal'
import ReactDOM from 'react-dom'

export default function ModalPortal({children}: {children: React.ReactNode}) {
  const {isOpen, closeModal} = useModal()

  return (
    <>
      {isOpen && ReactDOM.createPortal(
        <>
          <div 
            onClick={closeModal} 
            className='absolute w-full h-full bg-black bg-opacity-35 z-40'
          />
          {children}
        </>,
        document.body
      )}
    </>
  )
}
