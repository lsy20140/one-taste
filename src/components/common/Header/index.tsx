'use client'
import React from 'react'
import Button from "../Button";
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import SearchPlace from '@/components/SearchPlace';
import Link from 'next/link';

export default function Header() {
  const {data: session} = useSession()
  const user = session?.user

  return (
    <>
    <header className='sticky top-0 bg-white px-24 max-md:px-16 max-sm:px-9 border-b z-30'>
      <div className="h-16 flex justify-between py-3">
        {/* 로고 반응형 */}
        <div className='relative w-1/3 flex flex-grow-1 h-full max-sm:hidden'>
          <Link href={'/'} className='flex items-center'>
            <Image alt='logo' src={'/images/logo.svg'} width={150} height={24}/>
          </Link>
        </div>
        <div className='relative w-1/3 h-full flex justify-start sm:hidden'>
          <Link href={'/'} className='flex items-center'>
            <Image alt='logo' src={'/images/icon.svg'} width={44} height={44}/>
          </Link>
        </div>
        {/* 검색 form, 자동 완성 wrapper */}
        <div className='h-full w-1/3 max-sm:w-2/3 text-center flex-grow-2'>
          <SearchPlace />
        </div>
        {/* session 존재 여부로 구분 */}
        <div className='w-1/3 flex justify-end items-center'>
          {user ? 
          <>
            <div className='flex gap-4 justify-end w-full items-center max-lg:hidden'>
              <Image src={user.image ?? ""} width={40} height={40} alt={user.nickname} className='rounded-full'/>
              <p className='font-semibold shrink-0'>{user.nickname}님</p>
              <div className='w-28 shrink-0'>
                <Button onClick={() => signOut()} bgColor='black' textColor='white' size='small'>
                  <p>로그아웃</p>
                </Button>
              </div>
            </div>
            <div className='lg:hidden'>
              <Image src={user.image ?? ""} width={40} height={40} alt={user.nickname} className='rounded-full'/>
            </div>
          </>
          :
            <div className='w-48'>
              <Button onClick={() => signIn()}>
                <p>로그인</p>
              </Button>  
            </div>      
          }
        </div>
      </div>
    </header>
    </>
  )
}
