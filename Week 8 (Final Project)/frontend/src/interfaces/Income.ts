interface Income {
  id?: string;
  source: string;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
  date: Date | string;
}

export default Income;
