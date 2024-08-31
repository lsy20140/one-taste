"use client";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import SearchPlace from "@/components/SearchPlace";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <header className="fixed w-full top-0 bg-white px-32 max-md:px-16 max-sm:px-4 border-b z-30">
        <div className="relative h-14 flex justify-between gap-2 py-2">
          {/* 로고 반응형 */}
          <div className="relative w-1/5 flex flex-grow-1 h-full max-sm:hidden">
            <Link href={"/"} className="flex items-center">
              <Image
                alt="logo"
                src={"/images/logo.svg"}
                width={130}
                height={24}
              />
            </Link>
          </div>
          <div className="relative w-1/5 h-full flex justify-start sm:hidden">
            <Link href={"/"} className="flex items-center">
              <Image
                alt="logo"
                src={"/images/icon.svg"}
                width={40}
                height={40}
              />
            </Link>
          </div>
          {/* 검색 form, 자동 완성 wrapper */}
          <div className="h-full w-1/3 max-sm:w-2/3 text-center flex-grow-2">
            <SearchPlace />
          </div>
          {/* session 존재 여부로 구분 */}
          <div className="w-1/5 flex justify-end items-center shrink-0">
            {user ? (
              <>
                <div
                  className="flex gap-2 h-full justify-end w-full items-center max-lg:hidden cursor-pointer"
                  onMouseOver={() => setShowMenu(true)}
                  onMouseOut={() => setShowMenu(false)}
                >
                  <Image
                    src={user.image ?? ""}
                    width={40}
                    height={40}
                    alt={user.nickname}
                    className="rounded-full"
                  />
                  <p className="font-semibold shrink-0">{user.nickname} 님</p>
                </div>
                <div className="lg:hidden">
                  <Image
                    src={user.image ?? ""}
                    width={40}
                    height={40}
                    alt={user.nickname}
                    className="rounded-full"
                  />
                </div>
                {showMenu && (
                  <div
                    className="absolute -bottom-16 max-w-32 w-full h-fit bg-white rounded-md font-medium"
                    onMouseOver={() => setShowMenu(true)}
                    onMouseOut={() => setShowMenu(false)}
                  >
                    <div className="flex flex-col text-sm">
                      <div
                        onClick={() => signOut()}
                        className="hover:bg-neutral-100 hover:font-semibold cursor-pointer py-2 px-3"
                      >
                        로그아웃
                      </div>
                      <Link
                        href={"/likes"}
                        className="hover:bg-neutral-100 hover:font-semibold py-2 px-3"
                      >
                        내가 찜한 식당
                      </Link>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="w-28">
                <p
                  onClick={() => signIn()}
                  className="text-right cursor-pointer hover:font-semibold"
                >
                  로그인
                </p>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
