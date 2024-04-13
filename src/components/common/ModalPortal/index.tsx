import { Dispatch, SetStateAction } from 'react'
import ReactDOM from 'react-dom'

type Props = {
  children: React.ReactNode,
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export default function ModalPortal({children, setShowModal}: Props) {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div 
            onClick={() => setShowModal(false)} 
            className='absolute w-full h-full bg-black bg-opacity-35 z-40'
          />
          {children}
        </>,
        document.body
      )}
    </>
  )
}
