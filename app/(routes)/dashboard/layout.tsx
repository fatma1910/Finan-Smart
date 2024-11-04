'use client'

import React , {useEffect} from "react"
import SideNav from "./_components/SideNav"
import DashboardHeader from "./_components/DashboardHeader"

import { db } from "@/utils/dpConfig"

import { Budgets } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import { useRouter } from "next/navigation"


function DashboardLayout ({children} : any) {
    const { user } = useUser();
    const router = useRouter();
    useEffect(() => {
        user && checkUserBudgets();
    }, [user]);

    const checkUserBudgets = async () => {
        if (!user?.primaryEmailAddress?.emailAddress) {
            return;
        }
        const result = await db
        .select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
    
        if (result?.length == 0) {
        router.replace("/dashboard/budgets");
        }
    };
    return (
        <div>
        <div className="fixed md:w-64 hidden md:block ">
            <SideNav />
        </div>
        <div className="md:ml-64 ">
            <DashboardHeader />
            {children}
        </div>
        </div>
    );
}


export default DashboardLayout;