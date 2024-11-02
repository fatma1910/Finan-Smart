export interface Budget {
    amount: number;
    totalSpend: number;
}

export interface Income {
    totalAmount: number;
}

export interface CardInfoProps {
    budgetList: Budget[];
    incomeList: Income[];
}