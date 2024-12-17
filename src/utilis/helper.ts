export type Transaction = {
  type: string;
  id: string;
  amount: string;
  category: string;
  description: string;
  date: Date;
};

export interface ValidationErrors {
  amount?: string;
  category?: string;
  description?: string;
}

export const categories = ["Food", "Transport", "Shopping", "Bills", "Salary"];

export const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;
