import Category from "./Category";

interface Expense {
  id?: string;
  amount?: number;
  description: string;
  category?: Category | string;
  date?: Date | string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default Expense;
