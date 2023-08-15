'use client'
import { useSession,signOut } from 'next-auth/react';
import React, { FC } from 'react'

const Navbar:FC = () => {
    const {data:session} = useSession();
  return (
    <div className='flex w-full shadow-lg items-center py-4 px-6 bg-[#213555] text-white justify-between'>
        <div className='text-base font-semibold'>{session?.user?.email}</div>
        <button onClick={()=>signOut()}><img className='w-8 h-8' src={'/images/logout.svg'} alt='' /></button>
    </div>
  )
}

export default Navbar;