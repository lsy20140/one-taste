'use client'
import { SimplePlace } from "@/model/place";
import { MapPosition } from "@/types/map";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAllPlaces } from "@/hooks/usePlace";

export default function Map() {
  const {data : places} = useGetAllPlaces()
  const mapRef = useRef<HTMLDivElement | any>(null)
  const [myPos, setMyPos] = useState<MapPosition | string>('');
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()
  const {naver} = window

  const success = (pos: GeolocationPosition) => {
    setMyPos({lat: pos.coords.latitude, lng: pos.coords.longitude})
  }
  const error = () => {
    setMyPos({lat: 37.3595704, lng: 127.105399})
  }

  // 사용자 현재 위치 받아와 지도 중심 설정
  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error)
    }
  },[])

  const geocodePlace = (place: SimplePlace, retryCount = 3, retryDelay = 1000) => {
    return new Promise(((resolve, reject) => {
      const attemptCode = (retryCount: number) => {
        if(!naver.maps.Service){
          if(retryCount <= 0){
            reject(new Error("naver maps service error"))
            return
          }
          setTimeout(() => attemptCode(retryCount-1), retryDelay)
          return
        }
        naver.maps.Service.geocode({query: place.address}, (status, res) => {
          if (status === naver.maps.Service.Status.ERROR) {
            reject(new Error("geocode error"))
            return
          }
          resolve({
            place_id: place.place_id,
            pos: new naver.maps.LatLng(Number(res.v2.addresses[0].y), Number(res.v2.addresses[0].x))
          })
        })
      }
      attemptCode(retryCount)
    }))
  }

  // 지도가 로드된 후 표시할 마커 배열에 저장
  const setAllMarkers = async (map: any) => {
    try{
      const markerPromises = places.map((place: any) => geocodePlace(place))
      const markersPos = await Promise.all(markerPromises)

      markersPos.forEach(({place_id, pos}) => {
        const marker = new naver.maps.Marker({
          position: pos,
          map,
          title: place_id.toString(),
          icon: {
            url: '/images/marker_icon.svg',
            size: new naver.maps.Size(28, 42),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(14, 21)
          }
        })
        marker.addListener("click", () => {
          router.push(`/place/${place_id}`)
        })
      })
    }catch(error){
      console.log(error)
    }
  }

  // 지도 생성
  useEffect(() => {
    const naverMapScript = document.createElement('script')
    naverMapScript.async = false
    naverMapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`
    document.head.appendChild(naverMapScript)

    const onLoadNaverAPI = () => {
      setIsLoaded(true)
      if(typeof myPos !== 'string' && isLoaded){
        const mapOptions = {
          center: new naver.maps.LatLng(myPos.lat, myPos.lng),
          zoom:14,
          minZoom:11,
        }
        const map = new naver.maps.Map(mapRef.current, mapOptions)

        setAllMarkers(map)
      }
    }

    naverMapScript.addEventListener('load', onLoadNaverAPI)

    return () => {
      naverMapScript.removeEventListener('load', onLoadNaverAPI)
    }
  },[myPos, isLoaded])

  return (
    <>
      <div id="map" ref={mapRef} className="w-full h-full z-0"/>      
    </>
  )
}
