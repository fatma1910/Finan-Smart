

export interface CardInfoProps {
    budgetList: BudgetItem[];
    incomeList: IncomesItem[];
}

export interface BudgetItem {
    totalSpend: number;
    totalItem: number;
    id: number;
    name: string;
    amount: any;
    icon: string | null;
    createdBy: string;
}

export interface ExpensesItem {
    id: number;
    name: string;
    amount: string;
    createdAt: string;
}

export interface IncomesItem  {
    totalAmount: number;
    id: number;
    name: string;
    amount: string;
    icon: string | null;
    createdBy: string;
}

export interface BudgetInfo {
    id: number;
    name: string;
    amount: number;
    icon: string | null;
  }
  