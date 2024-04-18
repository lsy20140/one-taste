import { PiHeart, PiHeartFill } from "react-icons/pi";

type Props = {
  liked: Boolean
}

export default function HeartButton({liked}: Props) {

  return (
    <>
      {liked ?
        <PiHeartFill color="#ef4444" cursor={'pointer'} fontSize={32}/>
        :
        <PiHeart color="black" cursor={'pointer'} fontSize={32}/>  
      }
    </>
  )
}