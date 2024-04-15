'use client'
import { modalState } from "@/store/modalState";
import { useRecoilState } from "recoil";

export function useModal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return {isOpen, openModal, closeModal}
} 