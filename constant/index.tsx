import formatNumber from "@/utils";
import { CircleDollarSign, LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, Wallet } from "lucide-react";

export const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Incomes",
      icon: CircleDollarSign,
      path: "/dashboard/incomes",
    },
    {
      id: 3,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 4,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },

    {
      id: 5,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];

  export type CardDataItem = {
    label: string;
    value: string | number;
    icon: JSX.Element;
  };

  export const createCardData = (
    totalBudget: number,
    totalSpend: number,
    budgetListLength: number,
    totalIncome: number
  ): CardDataItem[] => [
    {
      label: "Total Budget",
      value: `$${formatNumber(totalBudget)}`,
      icon: <PiggyBank className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />,
    },
    {
      label: "Total Spend",
      value: `$${formatNumber(totalSpend)}`,
      icon: <ReceiptText className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />,
    },
    {
      label: "No. Of Budget",
      value: budgetListLength,
      icon: <Wallet className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />,
    },
    {
      label: "Sum of Income Streams",
      value: `$${formatNumber(totalIncome)}`,
      icon: <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />,
    },
  ];