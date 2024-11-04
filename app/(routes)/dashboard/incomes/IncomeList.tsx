"use client";
import React, { useEffect, useState } from "react";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Incomes, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dpConfig";
import CreateIncomes from "./_components/CreateIncomes";
import IncomeItem from "./_components/IncomeItem";

interface Income {
  totalSpend: number;
  totalItem: number;
  id: number;
  name: string;
  amount: string;
  icon: string | null;
  createdBy: string;
}

function IncomeList() {
  const [incomelist, setIncomelist] = useState<Income[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getIncomelist();
    }
  }, [user]);

  const getIncomelist = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      return;
    }
    const result = await db
      .select({
        ...getTableColumns(Incomes),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Incomes)
      .leftJoin(Expenses, eq(Incomes.id, Expenses.budgetId))
      .where(eq(Incomes.createdBy, user.primaryEmailAddress.emailAddress))
      .groupBy(Incomes.id)
      .orderBy(desc(Incomes.id));

    setIncomelist(result);
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateIncomes refreshData={() => getIncomelist()} />
        {incomelist.length > 0
          ? incomelist.map((income) => (
              <IncomeItem
                budget={income}
                key={income.id}
                refreshData={getIncomelist} // Pass refreshData function
              />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default IncomeList;
