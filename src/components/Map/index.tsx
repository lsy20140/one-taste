'use client'
import { SimplePlace } from "@/model/place";
import { MapPosition, SimpleMarker } from "@/types/map";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { useGetAllPlaces } from "@/hooks/usePlace";

export default function Map() {
  const {data : places, isFetched} = useGetAllPlaces()
  const mapRef = useRef<HTMLDivElement | any>(null)
  const [myPos, setMyPos] = useState<MapPosition | string>('');
  const [markers, setMarkers] = useState<SimpleMarker[]>([])
  const markerRef = useRef<any | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(true)
  const router = useRouter()

  const success = (pos: GeolocationPosition) => {
    setMyPos({lat: pos.coords.latitude, lng: pos.coords.longitude})
  }
  const error = () => {
    setMyPos({lat: 37.3595704, lng: 127.105399})
  }


  useEffect(() => {
    setIsMapLoading(true)
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error)
    }
  },[])

  useEffect(() => {
    if (typeof myPos !== 'string') {
      const center = new naver.maps.LatLng(myPos?.lat ?? 0 , myPos?.lng ?? 0)
      mapRef.current = new naver.maps.Map('map', {center: center, minZoom:11, mapDataControl: false});
    }
  },[myPos])

  const setAllMarkers = () => {
    if(isFetched && places){
      places.map((place: SimplePlace) => {
        naver.maps.Service.geocode({query: place.address}, (status, res) => {
          if (status === naver.maps.Service.Status.ERROR) {
            return
          }
          setMarkers((prev) => [...prev, {lat: Number(res.v2.addresses[0].y), lng: Number(res.v2.addresses[0].x), id: place.place_id}])
        })
      })
    }

  }

  useEffect(() => {
    setAllMarkers()
  },[mapRef.current])

  useEffect(() => {
    markers.map((marker: SimpleMarker) => {
      markerRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng({lat: marker.lat, lng: marker.lng}),
        map: mapRef.current,
        title: marker.id.toString(),
      });

      markerRef.current.addListener("click", (e: any) => {
        router.push(`/place/${e.overlay.title}`)
      })
    })
    setIsMapLoading(false)
  },[markers])  

  return (
    <>
      <Script 
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`} 
        strategy="beforeInteractive" 
      />

      <div id="map" ref={mapRef} className="w-full h-full z-0"/>      
      {isMapLoading &&
        <div className="absolute inset-0 flex w-full h-full justify-center items-center">
          <div className="absolute w-full h-full bg-black bg-opacity-50 z-[25]"/>
          <div className="flex flex-col items-center gap-2 z-[30]">
            <ClipLoader color="#ef4444" size={48}/>
            <p className="font-bold rounded-md px-3 py-1 text-white">정보 불러오는 중</p>
          </div>

        </div>
      } 
    </>
  )
}
