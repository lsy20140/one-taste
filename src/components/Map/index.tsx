'use client'
import { MapPosition } from "@/types/map";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export default function Map() {
  const mapRef = useRef<HTMLDivElement | any>(null)
  const [myPos, setMyPos] = useState<MapPosition | string>('');

  const success = (pos: GeolocationPosition) => {
    setMyPos({lat: pos.coords.latitude, lng: pos.coords.longitude})
  }
  const error = () => {
    setMyPos({lat: 37.3595704, lng: 127.105399})
  }
  
  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error)
    }
  },[])

  useEffect(() => {
    if (typeof myPos !== 'string') {
      const center = new naver.maps.LatLng(myPos?.lat ?? 0 , myPos?.lng ?? 0)
      mapRef.current = new naver.maps.Map('map', {center: center});
    }
  },[myPos])


  return (
    <>
      <Script src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`} />
      <div id="map" ref={mapRef} className="w-full h-full"></div>
    </>
  )
}
