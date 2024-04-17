'use client'
import { Modal, modalState } from "@/store/modalState";
import { useRecoilState } from "recoil";

export function useModal() {
  const [modal, setModal] = useRecoilState(modalState)

  const openModal = ({id, props}: Modal) => {
    const newModal = [...modal]
    newModal.push({id: id, props: props})
    setModal(newModal)
  }

  const closeModal = () => {
    const modalList = [...modal]
    modalList.pop()
    setModal(modalList)
  }

  return {openModal, closeModal}
} 