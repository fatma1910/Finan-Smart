import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dpConfig";

import { Budgets, Expenses } from "@/utils/schema";
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";


interface AddExpenseProps {
  budgetId: number | string;
  user: { id: string; email: string }; 
  refreshData: () => void;
}

const AddExpense: React.FC<AddExpenseProps> = ({ budgetId, user, refreshData }) => {
  const [name, setName] = useState<string | undefined>();
  const [amount, setAmount] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const addNewExpense = async () => {
  setLoading(true);
  
  const parsedAmount = Number(amount); 
  const createdAt = moment().format("DD/MM/yyyy");

  try {

    const result = await db
      .insert(Expenses)
      .values({
        name: name || "", 
        amount: parsedAmount, 
        budgetId: budgetId,
        createdAt: createdAt,
        createdBy: user?.id || "", 
      })
      .returning({ insertedId: Expenses.id });

    setAmount("");
    setName("");
    
    if (result) {
      refreshData(); 
      toast("New Expense Added!");
    }
  } catch (error) {
    console.error("Error adding new expense:", error);
    toast.error("Failed to add expense");
  } finally {
    setLoading(false); 
  }
};


  return (
    <div className="border p-5 rounded-2xl">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(name && amount) || loading}
        onClick={() => addNewExpense()}
        className="mt-3 w-full rounded-full"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
};

export default AddExpense;
