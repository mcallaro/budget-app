import { Button, Modal, Stack } from "react-bootstrap";
import { useBudgets, uncategorizedBudgetId } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";

export const ViewExpensesModal = ({ budgetId, handleClose }) => {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const budget =
    uncategorizedBudgetId === budgetId
      ? { name: "Uncategorized", id: uncategorizedBudgetId }
      : budgets.find((budget) => budget.id === budgetId);

  const expenses = getBudgetExpenses(budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Stack direction="horizontal" gap="2">
          <div>Expenses - {budget?.name}</div>
          {budgetId !== uncategorizedBudgetId && (
            <Button
              variant="outline-danger"
              onClick={() => {
                deleteBudget(budget);
                handleClose();
              }}
            >
              Delete
            </Button>
          )}
        </Stack>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="veritcal" gap="3">
          {expenses.map((expense) => (
            <Stack key={expense.id} direction="horizontal" gap="2">
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => deleteExpense(expense)}
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};
