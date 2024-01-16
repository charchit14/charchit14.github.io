// Define type for BudgetQuery
export type BudgetQuery = {
  id?: string;
  title?: string;
  startDate?: Date;
  endDate?: Date;
  category?: string;
};

// Define type for CategoryQuery
export type CategoryQuery = {
  id?: string;
  title?: string;
};

// Define type for IncomeQuery
export type IncomeQuery = {
  id?: number;
  source?: string;
  amount?: number;
};

// Define type for ExpenseQuery
export type ExpenseQuery = {
  id?: string;
  amount?: number;
  startDate?: Date;
  endDate?: Date;
  description?: string;
  category?: string;
};
