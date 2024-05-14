import { SimplePlace } from "@/model/place"

export type MapPosition = {
  lat: number | 0,
  lng: number | 0
}

export type SimpleMarker = MapPosition & {
  id: Number,
}
