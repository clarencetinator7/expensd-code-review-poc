import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Category {
  id: string;
  name: string;
  color: string;
}

interface CategoryStore {
  categories: Category[];
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
}

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      categories: [
        {
          id: "1",
          name: "Food & Dining",
          color: "#f97316",
        },
        {
          id: "2",
          name: "Transportation",
          color: "#3b82f6",
        },
        {
          id: "3",
          name: "Entertainment",
          color: "#8b5cf6",
        },
        {
          id: "4",
          name: "Utilities",
          color: "#10b981",
        },
      ],
      addCategory: (category: Category) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),
      updateCategory: (category: Category) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === category.id ? category : c,
          ),
        })),
      deleteCategory: (id: string) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),
    }),
    {
      name: "category-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
