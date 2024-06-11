'use client'
import { SimplePlace } from "@/model/place";
import { MapPosition, SimpleMarker } from "@/types/map";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { useGetAllPlaces } from "@/hooks/usePlace";
import Script from "next/script";

export default function Map() {
  const {data : places} = useGetAllPlaces()
  const mapRef = useRef<HTMLDivElement | any>(null)
  const [myPos, setMyPos] = useState<MapPosition | string>('');
  const [isLoaded, setIsLoaded] = useState(false)
  const [markers, setMarkers] = useState<SimpleMarker[]>([])
  const markerRef = useRef<any | null>(null);
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

  // 지도가 로드된 후 표시할 마커 배열에 저장
  const setAllMarkers = () => {
    if(!isLoaded || !naver.maps.Service) return

    places && places.map((place: SimplePlace) => {
    naver.maps.Service.geocode({query: place.address}, (status, res) => {
      if (status === naver.maps.Service.Status.ERROR) {
        return
      }
      setMarkers((prev) => [...prev, {lat: Number(res.v2.addresses[0].y), lng: Number(res.v2.addresses[0].x), id: place.place_id}])
    })
  })
  }


  // 지도 생성
  useEffect(() => {
    const naverMapScript = document.createElement('script')
    naverMapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`
    naverMapScript.id = "mapId"
    document.head.appendChild(naverMapScript)

    const { naver } = window;
    if (!mapRef.current || !naver) return;
    
    naverMapScript.onload = () => {
      setIsLoaded(true)
      isLoaded && setAllMarkers()

      if(typeof myPos !== 'string'){
        const mapOptions = {
          center: new naver.maps.LatLng(myPos.lat, myPos.lng),
          zoom:14,
          minZoom:11,
        }
        mapRef.current = new naver.maps.Map('map', mapOptions)
      }
    }
  },[myPos, mapRef.current, naver])


  // 지도 위에 마커 표시하기
  useEffect(() => {
    console.log("places", places)
    console.log("markers", markers)
    if(places.length !== markers.length){
      setAllMarkers()
      return
    }
    places && markers && markers.map((marker: SimpleMarker) => {
      markerRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng({lat: marker.lat, lng: marker.lng}),
        map: mapRef.current,
        title: marker.id.toString(),
        icon: {
          url: '/images/marker_icon.svg',
          size: new naver.maps.Size(28, 42),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(14, 21)
        }
      });
      // 클릭 시 요약 정보 하단 모달 나타남
      markerRef.current.addListener("click", (e: any) => {
        router.push(`/place/${e.overlay.title}`)
      })
    })
  },[markers])  

  return (
    <>
      <div id="map" ref={mapRef} className="w-full h-full z-0"/>      
    </>
  )
}
