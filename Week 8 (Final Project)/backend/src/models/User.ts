import { randomUUID } from "crypto";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Income from "./Income";
import Category from "./Category";
import Budget from "./Budget";
import Expense from "./Expense";
@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @CreateDateColumn({ default: new Date(), name: "created_at", update: false })
  createdAt: Date;
  @UpdateDateColumn({ default: new Date(), name: "updated_at" })
  updatedAt: Date;
  @Column({ nullable: true, name: "refresh_token" })
  refreshToken?: string;
  @Column({ name: "reset_code", default: randomUUID() })
  resetCode: string;

  @OneToMany(() => Income, (income) => income.user)
  income: Income[];
  @OneToMany(() => Category, (category) => category.user)
  category: Category[];
  @OneToMany(() => Budget, (budget) => budget.user)
  budget: Budget[];
  @OneToMany(() => Expense, (expense) => expense.user)
  expense: Expense[];
}
