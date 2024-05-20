export type NaverMap = naver.maps.Map;

export type MapPosition = {
  lat: number,
  lng: number
}

export type SimpleMarker = MapPosition & {
  id: Number,
}

