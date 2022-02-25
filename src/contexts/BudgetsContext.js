import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext();

export const uncategorizedBudgetId = "Uncategorized";

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };

  const addBudget = ({ name, max }) => {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets;
      }

      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  };

  const deleteBudget = ({ id }) => {
    // TODO: Deal with expenses being categorized
    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id);
    });
  };

  const addExpense = ({ description, amount, budgetId }) => {
    setExpenses((prevExpense) => {
      return [...prevExpense, { id: uuidV4(), description, amount, budgetId }];
    });
  };

  const deleteExpense = ({ id }) => {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id);
    });
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addBudget,
        deleteBudget,
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
