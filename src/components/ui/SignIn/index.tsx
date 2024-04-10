'use client'

import Button from "@/components/common/Button";
import { ClientSafeProvider, signIn } from "next-auth/react";

type Props = {
  providers: Record<string,ClientSafeProvider>,
  callbackUrl: string
}

export default function SignIn({providers, callbackUrl}: Props) {
  return (
    <>
      {
        Object.values(providers).map(({name, id}) => (
          <Button key={id} text={`${name} 로그인`} onClick={() => signIn(id, {callbackUrl})} />
          
        ))
      }
    </>
  )
}
