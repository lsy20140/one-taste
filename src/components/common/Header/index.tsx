'use client'

import React from 'react'
import Button from "../Button";
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Header() {
  const {data: session} = useSession()
  const user = session?.user

  return (
    <>
    <header className='sticky top-0 px-24 max-md:px-16 max-sm:px-4 border-b border-b-neutral-300'>
      <div className="h-16 flex justify-between py-4">
        <div className='relative w-52 h-full max-sm:hidden'>
          <Image alt='logo' src={'/images/logo.svg'} fill/>
        </div>
        <div className='relative w-12 h-full sm:hidden'>
          <Image alt='logo' src={'/images/icon.svg'} fill/>
        </div>
        {user ? 
          <div className='flex gap-2 items-center'>
            <p>{user.nickname}님</p>
            <Button text="로그아웃" onClick={() => signOut()}/>
          </div>
        :
            <Button text="로그인" onClick={() => signIn()}/>
        }
      </div>
    </header>
    </>
  )
}
