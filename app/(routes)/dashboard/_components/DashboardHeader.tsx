import { UserButton } from '@clerk/nextjs'
import React from 'react'

const DashboardHeader = () => {
  return (
    <header className='p-5 shadow-sm border-b flex justify-between'>
        <div></div>
        <div>
            <UserButton afterSignOutUrl='/' />
        </div>
        
    </header>
  )
}

export default DashboardHeader