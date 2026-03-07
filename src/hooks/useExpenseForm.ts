import { useState, useCallback } from "react";

interface ExpenseFormData {
  id?: string;
  description: string;
  amount: string;
  category: string;
  date: string;
}

export const useExpenseForm = (defaultCategoryId: string) => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ExpenseFormData>({
    description: "",
    amount: "",
    category: defaultCategoryId,
    date: new Date().toISOString().split("T")[0],
  });

  const resetForm = useCallback(() => {
    setFormData({
      description: "",
      amount: "",
      category: defaultCategoryId,
      date: new Date().toISOString().split("T")[0],
    });
    setEditingId(null);
  }, [defaultCategoryId]);

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen);
      if (!newOpen) {
        resetForm();
      }
    },
    [resetForm],
  );

  const handleSubmit = useCallback(
    (
      onAdd: (data: ExpenseFormData & { id: string }) => void,
      onUpdate: (id: string, data: ExpenseFormData) => void,
    ) => {
      return (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.description.trim() || !formData.amount) return;

        if (editingId) {
          onUpdate(editingId, formData);
        } else {
          onAdd({
            ...formData,
            id: Date.now().toString(),
          });
        }

        resetForm();
        setOpen(false);
      };
    },
    [formData, editingId, resetForm],
  );

  const handleEdit = useCallback(
    (expense: ExpenseFormData & { id: string }) => {
      setFormData(expense);
      setEditingId(expense.id);
      setOpen(true);
    },
    [],
  );

  const handleFieldChange = useCallback(
    <K extends keyof ExpenseFormData>(field: K, value: ExpenseFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  return {
    open,
    setOpen,
    editingId,
    formData,
    setFormData,
    handleOpenChange,
    handleSubmit,
    handleEdit,
    handleFieldChange,
    resetForm,
    isEditing: editingId !== null,
  };
};
