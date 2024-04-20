'use client'
import { DetailPlace } from "@/model/place";
import { MapPosition, SimpleMarker } from "@/types/map";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Map() {
  const mapRef = useRef<HTMLDivElement | any>(null)
  const [myPos, setMyPos] = useState<MapPosition | string>('');
  const [places, setPlaces] = useState<DetailPlace[]>([])
  const [markers, setMarkers] = useState<SimpleMarker[]>([])
  const markerRef = useRef<any | null>(null);
  const router = useRouter()
  const success = (pos: GeolocationPosition) => {
    setMyPos({lat: pos.coords.latitude, lng: pos.coords.longitude})
  }
  const error = () => {
    setMyPos({lat: 37.3595704, lng: 127.105399})
  }

  const fetchData = async() => {
    const res = await fetch('/api/place', {
      method:'GET'
    })
    return res.json()
  }
  
  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error)
    }
    fetchData().then((res) => {
      setPlaces([...res])
    })
  },[])

  useEffect(() => {
    if (typeof myPos !== 'string') {
      const center = new naver.maps.LatLng(myPos?.lat ?? 0 , myPos?.lng ?? 0)
      mapRef.current = new naver.maps.Map('map', {center: center});
    }
  },[myPos])

  useEffect(() => {
    places.map((place: DetailPlace) => {
      naver.maps.Service.geocode({query: place.address}, (status, res) => {
        if (status === naver.maps.Service.Status.ERROR) {
          return
        }
        setMarkers([...markers, {lat: Number(res.v2.addresses[0].y), lng: Number(res.v2.addresses[0].x), id: place.place_id}])
      })
    })
  },[places])

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
  },[markers])  

  return (
    <>
      <Script 
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`} 
        strategy="beforeInteractive" 
      />
      <div id="map" ref={mapRef} className="w-full h-full"/>      
    </>
  )
}
