'use client'
import { useRecoilState } from "recoil";
import { Modal, modalState } from "@/store/modalState";
import BottomInfoBox from "../BottomInfoBox";
import ModalBackground from "../common/ModalBackground";
import PlaceDetailModal from "../PlaceDetailModal";

export default function ModalProvider() {
  const [list] = useRecoilState(modalState)

  return (
    <>
      {list.map(({ id, props }: Modal) => (
        <>
          {id === 'simple'&&
            <ModalBackground>
              <BottomInfoBox key={id} {...props}/>
            </ModalBackground>
          }
          {id === 'detail' && 
            <PlaceDetailModal key={id} {...props}/>
          }
        </>
      ))}
    </>
  )
}
