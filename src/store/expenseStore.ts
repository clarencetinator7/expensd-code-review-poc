import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  deleteExpensesByCategory: (categoryId: string) => void;
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set) => ({
      expenses: [],
      addExpense: (expense: Expense) =>
        set((state) => ({
          expenses: [...state.expenses, expense],
        })),
      updateExpense: (expense: Expense) =>
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === expense.id ? expense : e,
          ),
        })),
      deleteExpense: (id: string) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),
      deleteExpensesByCategory: (categoryId: string) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.category !== categoryId),
        })),
    }),
    {
      name: "expense-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
