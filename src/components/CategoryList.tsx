import { useCategoryStore } from "@/store/categoryStore";
import { useExpenseStore } from "@/store/expenseStore";
import { useCategoryForm } from "@/hooks/useCategoryForm";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import StyledButton from "./ui/button";
import { ActionButtons } from "./ActionButtons";
import { ListHeader } from "./ListHeader";
import { EmptyState } from "./EmptyState";
import { CrudDialog } from "./CrudDialog";

export const CategoryList = () => {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useCategoryStore();
  const { deleteExpensesByCategory } = useExpenseStore();

  const {
    open,
    formData,
    handleOpenChange,
    handleSubmit,
    handleEdit,
    handleFieldChange,
    isEditing,
  } = useCategoryForm();

  const onSubmit = handleSubmit(
    (data) => {
      addCategory(data);
    },
    (id, data) => {
      updateCategory({
        id,
        name: data.name,
        color: data.color,
      });
    },
  );

  const handleDelete = (id: string) => {
    deleteCategory(id);
    deleteExpensesByCategory(id);
  };

  return (
    <>
      <div className="space-y-4">
        <ListHeader
          title="Categories"
          onAddClick={() => handleOpenChange(true)}
        />

        {categories.length === 0 ? (
          <EmptyState message="No categories yet. Create one to get started!" />
        ) : (
          <div className="space-y-2 border border-border rounded-lg divide-y divide-border">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-4 bg-card hover:bg-accent/50 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="font-semibold">{category.name}</h3>
                </div>
                <ActionButtons
                  onEdit={() => handleEdit(category)}
                  onDelete={() => handleDelete(category.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <CrudDialog
        open={open}
        onOpenChange={handleOpenChange}
        title="Category"
        isEditing={isEditing}
        onSubmit={onSubmit}
      >
        <div className="space-y-2">
          <Label htmlFor="name">Category Name</Label>
          <Input
            id="name"
            placeholder="e.g., Food, Transport, Entertainment"
            value={formData.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <div className="flex gap-2 items-center">
            <input
              id="color"
              type="color"
              value={formData.color}
              onChange={(e) => handleFieldChange("color", e.target.value)}
              className="w-12 h-10 rounded cursor-pointer border border-input"
            />
            <span className="text-sm text-muted-foreground">
              {formData.color}
            </span>
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <StyledButton
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </StyledButton>
          <StyledButton type="submit" variant="default">
            {isEditing ? "Update" : "Create"}
          </StyledButton>
        </div>
      </CrudDialog>
    </>
  );
};
