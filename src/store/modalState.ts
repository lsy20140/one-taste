import { atom } from "recoil";
import {Props as SimpleModalProps} from '@/components/BottomInfoBox'
import {Props as DetailModalProps} from '@/components/PlaceDetailModal'

export type ModalProps = SimpleModalProps | DetailModalProps 

export type Modal = {
  id: string,
  props: ModalProps
}

export const modalState= atom<Modal[]>({
  key: 'modalState',
  default: []
})