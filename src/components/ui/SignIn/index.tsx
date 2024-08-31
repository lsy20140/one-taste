"use client";

import { GoogleButton, KakaoButton } from "@/components/LoginButton";
import { ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function SignIn({ providers, callbackUrl }: Props) {
  return (
    <div className="w-full h-full mx-auto flex items-center justify-center pb-28">
      <div className="text-center w-72 flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-2 items-center mb-6">
          <Image src={"/images/icon.svg"} width={48} height={40} alt="logo" />
          <h1 className="font-semibold">원테이스트</h1>
          <p className="text-neutral-500">
            원테이스트와 함께 하나뿐인 맛을 찾아보세요!
          </p>
        </div>

        {Object.values(providers).map(({ name, id }) => {
          if (name === "Google") {
            return (
              <GoogleButton
                key={id}
                onClick={() => signIn(id, { callbackUrl })}
              />
            );
          } else if (name === "Kakao") {
            return (
              <KakaoButton
                key={id}
                onClick={() => signIn(id, { callbackUrl })}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
