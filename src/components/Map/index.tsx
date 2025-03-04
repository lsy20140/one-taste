'use client'
import { SimplePlace } from '@/model/place'
import { MapPosition } from '@/types/map'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGetAllPlaces } from '@/hooks/usePlace'
import MarkerInfoWindow from '../MarkerInfoWindow'
import ReactDOMServer from 'react-dom/server'
import { ClipLoader } from 'react-spinners'

export default function Map() {
  const { data: places, isLoading, isFetching } = useGetAllPlaces()
  const mapRef = useRef<HTMLDivElement | any>(null)
  const [myPos, setMyPos] = useState<MapPosition | string>('')
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()
  const { naver } = window

  const success = (pos: GeolocationPosition) => {
    setMyPos({ lat: pos.coords.latitude, lng: pos.coords.longitude })
  }
  const error = () => {
    setMyPos({ lat: 37.3595704, lng: 127.105399 })
  }

  // 사용자 현재 위치 받아와 지도 중심 설정
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }, [])

  const geocodePlace = (
    place: SimplePlace,
    retryCount = 3,
    retryDelay = 1000
  ) => {
    return new Promise((resolve, reject) => {
      const attemptCode = (retryCount: number) => {
        if (!naver.maps.Service) {
          if (retryCount <= 0) {
            reject(new Error('naver maps service error'))
            return
          }
          setTimeout(() => attemptCode(retryCount - 1), retryDelay)
          return
        }
        naver.maps.Service.geocode({ query: place.address }, (status, res) => {
          if (status === naver.maps.Service.Status.ERROR) {
            reject(new Error('geocode error'))
            return
          }
          resolve({
            place_id: place.place_id,
            pos: new naver.maps.LatLng(
              Number(res.v2.addresses[0].y),
              Number(res.v2.addresses[0].x)
            ),
            place_name: place.name,
          })
        })
      }
      attemptCode(retryCount)
    })
  }

  // 지도가 로드된 후 표시할 마커 배열에 저장
  const setAllMarkers = async (map: any) => {
    try {
      const markerPromises = places.map((place: any) => geocodePlace(place))
      const markersPos = await Promise.all(markerPromises)

      markersPos.forEach(({ place_id, pos, place_name }: any) => {
        const marker = new naver.maps.Marker({
          position: pos,
          map,
          title: place_id,
          icon: {
            url: '/images/marker_icon.svg',
            size: new naver.maps.Size(28, 42),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(14, 21),
          },
        })
        router.prefetch(`/place/${place_id}`)
        marker.addListener('click', () => {
          router.push(`/place/${place_id}`)
        })
        const infoWindow = new naver.maps.InfoWindow({
          content: ReactDOMServer.renderToString(
            <MarkerInfoWindow name={place_name} />
          ),
          borderWidth: 0,
          disableAutoPan: true,
        })

        marker.addListener('mouseover', () => {
          infoWindow.open(map, marker)
        })

        marker.addListener('mouseout', () => {
          infoWindow.close()
        })
      })
    } catch (error) {
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
      if (typeof myPos !== 'string' && isLoaded) {
        const mapOptions = {
          center: new naver.maps.LatLng(myPos.lat, myPos.lng),
          zoom: 14,
          minZoom: 11,
        }
        const map = new naver.maps.Map(mapRef.current, mapOptions)

        setAllMarkers(map)
      }
    }

    naverMapScript.addEventListener('load', onLoadNaverAPI)

    return () => {
      naverMapScript.removeEventListener('load', onLoadNaverAPI)
    }
  }, [myPos, isLoaded])

  // if (isLoading || isFetching || !isLoaded) {
  //   return (
  //     <div className="absolute w-full h-full flex justify-center items-center ">
  //       <div className="flex flex-col gap-3 items-center">
  //         <ClipLoader color="red" />
  //         <p className="text-sm">지도 불러오는 중</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      {(!isLoaded || isLoading || isFetching || mapRef.current == null) && (
        <div className="absolute w-full h-full flex justify-center items-center z-50 ">
          <div className="flex flex-col gap-3 items-center">
            <ClipLoader color="red" />
            <p className="text-sm">지도 불러오는 중</p>
          </div>
        </div>
      )}
      <div id="map" ref={mapRef} className="w-full h-full z-0" />
    </>
  )
}
