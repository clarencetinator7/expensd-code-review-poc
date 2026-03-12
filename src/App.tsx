import { useState } from "react";
import { useCategoryStore } from "./store/categoryStore";
import { useExpenseStore } from "./store/expenseStore";
import { CategoryList } from "./components/CategoryList";
import { ExpenseList } from "./components/ExpenseList";
import { loginPage } from "./components/LoginPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import "./styles/globals.css";

function App() {
  const [showLoginPage, setShowLoginPage] = useState(false);
  const { categories } = useCategoryStore();
  const { expenses } = useExpenseStore();

  if (showLoginPage) {
    return <LoginPage onLoginSuccess={() => setShowLoginPage(false)} />;
  }

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const averageExpense =
    expenses.length > 0 ? totalExpenses / expenses.length : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Expensd</h1>
            <p className="text-muted-foreground mt-2">
              Manage your expenses and budgets efficiently
            </p>
          </div>
          <button
            onClick={() => setShowLoginPage(true)}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Login
          </button>
        </header>
        {categories.length > 0 && expenses.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg border border-border bg-card">
                <p className="text-muted-foreground text-sm">Total Expenses</p>
                <p className="text-3xl font-bold text-primary mt-2">
                  ${totalExpenses.toFixed(2)}
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <p className="text-muted-foreground text-sm">
                  Total Categories
                </p>
                <p className="text-3xl font-bold text-primary mt-2">
                  {categories.length}
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <p className="text-muted-foreground text-sm">Average Expense</p>
                <p className="text-3xl font-bold text-primary mt-2">
                  ${averageExpense.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="mt-6">
            <ExpenseList />
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <CategoryList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
