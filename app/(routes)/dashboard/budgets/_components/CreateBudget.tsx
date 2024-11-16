"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { db } from "@/utils/dpConfig";

// Define prop types
interface CreateBudgetProps {
  refreshData: () => void;
}

const CreateBudget: React.FC<CreateBudgetProps> = ({ refreshData }) => {
  const [emojiIcon, setEmojiIcon] = useState<string>("😀"); // Emoji icon state
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false); // Emoji picker state
  const [name, setName] = useState<string | undefined>(); // Budget name state
  const [amount, setAmount] = useState<number | undefined>(); // Budget amount state

  const { user } = useUser(); // Fetch user from Clerk

  // Function to create a budget
  const onCreateBudget = async () => {
    if (!name || amount === undefined || !user?.primaryEmailAddress?.emailAddress) {
      return;
    }
  
    // Convert amount to a string since the database expects it
    const stringifiedAmount = String(amount);
  
    const result = await db
      .insert(Budgets)
      .values({
        name,
        amount: stringifiedAmount, // Ensure this is a string
        createdBy: user.primaryEmailAddress.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: Budgets.id });
  
    if (result) {
      refreshData();
      toast("New Budget Created!");
    }
  };
  

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-slate-100 p-10 rounded-2xl
            items-center flex flex-col border-2 border-dashed
            cursor-pointer hover:shadow-md"
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                {openEmojiPicker && (
                  <div className="absolute z-20">
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  </div>
                )}
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    placeholder="e.g. Home Decor"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 5000$"
                    onChange={(e) => setAmount(parseFloat(e.target.value) || undefined)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={onCreateBudget}
                className="mt-5 w-full rounded-full"
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
