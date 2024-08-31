import SignIn from "@/components/ui/SignIn";
import { getProviders } from "next-auth/react";

type Props = {
  params: {
    callbackUrl: string;
  };
};

export default async function SignInPage({ params: { callbackUrl } }: Props) {
  const providers = (await getProviders()) ?? {};

  return (
    <div className="h-full bg-neutral-100 pt-20">
      <SignIn providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </div>
  );
}
