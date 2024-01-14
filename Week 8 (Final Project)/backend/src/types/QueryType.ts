export type BudgetQuery = {
  id?: string;
  title?: string;
  startDate?: Date;
  endDate?: Date;
  category?: string;
};

export type CategoryQuery = {
  id?: string;
  title?: string;
};

export type IncomeQuery = {
  id?: number;
  source?: string;
  amount?: number;
};

export type ExpenseQuery = {
  id?: string;
  amount?: number;
  startDate?: Date;
  endDate?: Date;
  description?: string;
  category?: string;
};
