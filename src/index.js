import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BudgetProvider } from './contexts/BudgetsContext';
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </React.StrictMode>,
  document.getElementById("app")
);
