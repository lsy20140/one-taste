import SignIn from "@/components/ui/SignIn";
import { getProviders } from "next-auth/react";

type Props = {
  params: {
    callbackUrl: string
  }
}

export default async function SignInPage({params: {callbackUrl}}:Props) {
  const providers = (await getProviders()) ?? {}

  return (
    <>
      <SignIn providers={providers} callbackUrl={callbackUrl ?? '/'}/> 
    </> 
  )
}