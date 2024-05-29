import Image from "next/image"

type Props = {
  onClick?: () => void
}

const base = 'w-full h-11 rounded-lg font-semibold tracking-wide flex justify-center items-center gap-2 hover:brightness-95'

export function GoogleButton({onClick}: Props){
  return(
    <button 
      className={`${base} bg-white text-black outline outline-1 outline-neutral-200`}
      onClick={onClick}
    >
      <Image src={'/images/google_btn_logo.png'} alt={'구글 로그인'} width={18} height={18} />
      <p>구글 로그인</p>
    </button>
  )
}

export function KakaoButton({onClick}: Props){
  return(
    <button 
      className={`${base} bg-kakaoBtn text-kakaoBtnText`}
      onClick={onClick}
    >
      <Image src={'/images/kakao_btn_logo.png'} alt={'카카오 로그인'} width={18} height={18} />
      <p>카카오 로그인</p>
    </button>
  )
}