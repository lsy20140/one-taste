import SignIn from "@/components/ui/SignIn";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";

type Props = {
  params: {
    callbackUrl: string
  }
}

export default async function SignInPage({params: {callbackUrl}}:Props) {
  const session = await getServerSession(authOptions)
  if(session) {
    console.log("session.user", session.user)
  }
  const providers = (await getProviders()) ?? {}

  return (
    <>
      <SignIn providers={providers} callbackUrl={callbackUrl ?? '/'}/> 
    </> 
  )
}