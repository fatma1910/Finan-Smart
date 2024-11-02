'use client';
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { useUser , UserButton } from "@clerk/nextjs";
import Link from "next/link";




const Header = () => {

    const {user , isSignedIn} = useUser()
  return (
    <header className="p-5 flex justify-between items-center border shadow-sm">
        <Link href='/' className="flex items-center ">
            <Image src={"/chart-donut.svg"} alt={"logo"} width={40} height={25} />
            <span className="text-blue-800 font-bold text-xl">FinanSmart</span>
        </Link>
        {isSignedIn ? (
          <div className="flex gap-3  items-center">
            <Link href={`${isSignedIn ? '/dashboard':'sign-in' }`}>
              <Button variant="outline" className="rounded-full">
                Dashboard
              </Button>
            </Link>
            <UserButton/>
          </div>
          
        ):
        (
          <div className="flex gap-3  items-center">
            <Link href={`${isSignedIn ? '/dashboard':'sign-in' }`}>
              <Button variant="outline" className="rounded-full"
              
              >
                Dashboard
              </Button>
            </Link>
            <Link href={"/sign-in"}>
              <Button className="rounded-full">Get Started</Button>
            </Link>
          </div>
        )
        }
    </header>
  )
}

export default Header