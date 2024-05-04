'use client'
import { PiHeart, PiHeartFill } from "react-icons/pi";

type Props = {
  liked: Boolean
  size?: string,
  onLike?: any
}

export default function HeartButton({liked, size = 'normal', onLike}: Props) {
  return (
    <>
      {liked ?
        <button type="submit">
          <PiHeartFill color="#ef4444" cursor={'pointer'} fontSize={getSizeStyle(size)} onClick={()=> onLike(false)}/>
        </button>
        :
        <button type="submit">
          <PiHeart color="black" cursor={'pointer'} fontSize={getSizeStyle(size)} onClick={()=> onLike(true)}/>  
        </button>
      }
    </>
  )
}

function getSizeStyle(size?: string) {
  if(size === 'small'){
    return 24
  }else if(size === 'normal'){
    return 32
  }
}