import { Input } from "./ui/input";
import { Label } from "./ui/label";
import StyledButton from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useCategoryStore } from "@/store/categoryStore";
import { useExpenseStore } from "@/store/expenseStore";
import { useExpenseForm } from "@/hooks/useExpenseForm";
import { ActionButtons } from "./ActionButtons";
import { ListHeader } from "./ListHeader";
import { EmptyState } from "./EmptyState";
import { CrudDialog } from "./CrudDialog";

export const ExpenseList = () => {
  const { categories } = useCategoryStore();
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useExpenseStore();

  const {
    open,
    formData,
    handleOpenChange,
    handleSubmit,
    handleEdit,
    handleFieldChange,
    isEditing,
  } = useExpenseForm(categories[0]?.id || "");

  const onSubmit = handleSubmit(
    (data) => {
      addExpense({
        id: data.id,
        description: data.description,
        amount: parseFloat(data.amount),
        category: data.category,
        date: data.date,
      });
    },
    (id, data) => {
      updateExpense({
        id,
        description: data.description,
        amount: parseFloat(data.amount),
        category: data.category,
        date: data.date,
      });
    },
  );

  const categoryMap = categories.reduce(
    (acc, cat) => ({ ...acc, [cat.id]: cat }),
    {} as Record<string, (typeof categories)[0]>,
  );

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <>
      <div className="space-y-4">
        <ListHeader
          title="Expenses"
          onAddClick={() => handleOpenChange(true)}
          subtitle={
            <p className="text-lg font-semibold text-primary mt-2">
              Total: ${totalExpenses.toFixed(2)}
            </p>
          }
        />

        {expenses.length === 0 ? (
          <EmptyState
            message="No expenses yet. Add one to get started!"
            isBordered
          />
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => {
                  const cat = categoryMap[expense.category];
                  return (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">
                        {new Date(expense.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-2">
                          {cat && (
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: cat.color }}
                            />
                          )}
                          {cat?.name || "Unknown"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${expense.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <ActionButtons
                          onEdit={() =>
                            handleEdit({
                              id: expense.id,
                              description: expense.description,
                              amount: expense.amount.toString(),
                              category: expense.category,
                              date: expense.date,
                            })
                          }
                          onDelete={() => deleteExpense(expense.id)}
                          variant="default"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <CrudDialog
        open={open}
        onOpenChange={handleOpenChange}
        title="Expense"
        isEditing={isEditing}
        onSubmit={onSubmit}
      >
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="e.g., Lunch at restaurant"
            value={formData.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => handleFieldChange("amount", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleFieldChange("date", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleFieldChange("category", e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {categories.length === 0 ? (
              <option disabled value="">
                No categories available
              </option>
            ) : (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
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
