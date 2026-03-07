import { useState, useCallback } from "react";

interface UseCrudFormOptions<T> {
  initialData: T;
  onAdd: (data: T) => void;
  onUpdate: (id: string, data: T) => void;
  onValidate?: (data: T) => boolean;
}

export const useCrudForm = <T extends Record<string, unknown>>({
  initialData,
  onAdd,
  onUpdate,
  onValidate,
}: UseCrudFormOptions<T>) => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<T>(initialData);

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setEditingId(null);
  }, [initialData]);

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
    (e: React.FormEvent) => {
      e.preventDefault();

      if (onValidate && !onValidate(formData)) {
        return;
      }

      if (editingId) {
        onUpdate(editingId, formData);
      } else {
        onAdd(formData);
      }

      resetForm();
      setOpen(false);
    },
    [formData, editingId, onAdd, onUpdate, onValidate, resetForm],
  );

  const handleEdit = useCallback((item: T & { id: string }) => {
    setFormData(item);
    setEditingId(item.id);
    setOpen(true);
  }, []);

  const handleFieldChange = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
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
