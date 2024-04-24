'use client'
import React from 'react'
import Button from "../Button";
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import SearchPlace from '@/components/SearchPlace';

export default function Header() {
  const {data: session} = useSession()
  const user = session?.user

  return (
    <>
    <header className='sticky top-0 bg-white px-24 max-md:px-16 max-sm:px-4 border-b border-b-neutral-300 z-30'>
      <div className="h-16 flex justify-between py-3">
        {/* 로고 반응형 */}
        <div className='relative flex w-1/4 h-full max-sm:hidden'>
          <Image alt='logo' src={'/images/logo.svg'} width={180} height={28}/>
        </div>
        <div className='relative w-12 h-full sm:hidden'>
          <Image alt='logo' src={'/images/icon.svg'} fill/>
        </div>
        {/* 검색 form, 자동 완성 wrapper */}
        <div className='w-1/3 h-full text-center'>
          <SearchPlace />
        </div>
        {/* session 존재 여부로 구분 */}
        <div className='flex justify-end items-center w-1/6'>
          {user ? 
            <div className='gap-2 w-full '>
              <p>{user.nickname}님</p>
              <Button text="로그아웃" onClick={() => signOut()} color='black'/>
            </div>
          :
            <Button text="로그인" onClick={() => signIn()}/>
          }
        </div>
      </div>
    </header>
    </>
  )
}
