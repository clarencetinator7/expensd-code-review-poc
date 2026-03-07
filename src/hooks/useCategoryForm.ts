import { useState, useCallback } from "react";

interface CategoryFormData {
  id?: string;
  name: string;
  color: string;
}

export const useCategoryForm = () => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    color: "#3b82f6",
  });

  const resetForm = useCallback(() => {
    setFormData({ name: "", color: "#3b82f6" });
    setEditingId(null);
  }, []);

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
      onAdd: (data: CategoryFormData & { id: string }) => void,
      onUpdate: (id: string, data: CategoryFormData) => void,
    ) => {
      return (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) return;

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
    (category: CategoryFormData & { id: string }) => {
      setFormData(category);
      setEditingId(category.id);
      setOpen(true);
    },
    [],
  );

  const handleFieldChange = useCallback(
    <K extends keyof CategoryFormData>(
      field: K,
      value: CategoryFormData[K],
    ) => {
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
