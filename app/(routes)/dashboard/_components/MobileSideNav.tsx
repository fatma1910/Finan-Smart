"use client"

import { menuList } from '@/constant';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const MobileSideNav = () => {
    const path = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false); // Close menu on route change
  }, [path]);

  return (
    <div>
        <div className="p-5 flex justify-between items-center md:hidden ">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-blue-800 focus:outline-none"
        >
          {isMenuOpen ? '✖' : '☰'}
        </button>
        <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static top-0 left-0 w-64 bg-white shadow-sm h-screen p-5 border transition-transform z-50`}
      >
        <div className='flex justify-between mb-5 items-center'>
            <Link href="/" className="flex items-center ">
                <Image src={'./chart-donut.svg'} alt="logo" width={40} height={25} />
                <span className="text-blue-800 font-bold text-xl ml-2">FinanSmart</span>
            </Link> 
        <button className=' text-xl '
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
        ✖
        </button>
        </div>
        
        <div className="mt-5">
          {menuList.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <h2
                className={`flex gap-2 items-center
                    text-gray-500 font-medium
                    mb-2
                    p-4 cursor-pointer rounded-full
                    hover:text-primary hover:bg-blue-100
                    ${
                      path == menu.path && 'text-primary bg-blue-100'
                    }`}
              >
                <menu.icon />
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
        
        </div>
      </div>
      

    </div>
  )
}

export default MobileSideNav

