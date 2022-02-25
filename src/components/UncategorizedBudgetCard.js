import { uncategorizedBudgetId, useBudgets } from "../contexts/BudgetsContext";
import { BudgetCard } from "./BudgetCard";

export const UncategorizedBudgetCard = (props) => {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(uncategorizedBudgetId).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (amount === 0) return null;
  return <BudgetCard name="Uncategorized" amount={amount} gray {...props} />;
};
