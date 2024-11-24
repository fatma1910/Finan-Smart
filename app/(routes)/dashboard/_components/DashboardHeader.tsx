import { UserButton } from '@clerk/nextjs'
import React from 'react'
import MobileSideNav from './MobileSideNav'

const DashboardHeader = () => {
  return (
    <header className='p-5 shadow-sm border-b flex items-center justify-between'>
        <div><MobileSideNav/></div>
        <div>
            <UserButton afterSignOutUrl='/' />
        </div>
        
    </header>
  )
}

export default DashboardHeader