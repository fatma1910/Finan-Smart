'use client'
import React,{useState, useEffect} from "react"
import { UserButton , useUser } from "@clerk/nextjs"
import CardInfo from "./_components/CardInfo";


const Dashboard = () => {

  const user = useUser();
  return (
    <div className="p-8">
      <h2 className="font-bold text-4xl">Hi, {user?.user?.fullName}</h2>
      <p className="text-gray-500">Here's what happening with your money. Lets manage your expenses</p>

      <CardInfo budgetList={[]} incomeList={[]}/>
    </div>
  )
}

export default Dashboard