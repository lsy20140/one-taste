'use client'

import { GoogleButton, KakaoButton } from "@/components/LoginButton";
import { ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";

type Props = {
  providers: Record<string,ClientSafeProvider>,
  callbackUrl: string
}

export default function SignIn({providers, callbackUrl}: Props) {
  return (
    <div className="w-1/4 h-1/2 min-w-80 min-h-72 top-1/2 mx-auto flex items-center justify-center bg-white rounded-lg shadow-md">
      <div className="text-center w-72 flex flex-col gap-4 items-center">
        <Image src={'/images/logo.svg'} width={150} height={40} alt="logo" className="mb-12"/>
        {
          Object.values(providers).map(({name, id}) => {
            if(name === 'Google'){
              return (
                <GoogleButton key={id} onClick={() => signIn(id, {callbackUrl})} />
              )
            }else if(name === 'Kakao'){
              return(
                <KakaoButton key={id} onClick={() => signIn(id, {callbackUrl})} />
              )
            }
          })
        }
      </div>
    </div>
  )
}
