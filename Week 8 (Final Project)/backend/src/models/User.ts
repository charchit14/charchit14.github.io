// Importing necessary decorators and modules from TypeORM
import { randomUUID } from "crypto";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

// Importing related entities for establishing relationships
import Income from "./Income";
import Category from "./Category";
import Budget from "./Budget";
import Expense from "./Expense";

// Defining the entity for the "users" table
@Entity("users")
export default class User {
  // Primary key column with UUID generation
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // Column for storing the username of the user
  @Column()
  username: string;

  // Column for storing the email of the user (unique constraint)
  @Column({ unique: true })
  email: string;

  // Column for storing the password of the user
  @Column()
  password: string;

  // Column for storing the creation timestamp of the user
  @CreateDateColumn({ default: new Date(), name: "created_at", update: false })
  createdAt: Date;

  // Column for storing the last update timestamp of the user
  @UpdateDateColumn({ default: new Date(), name: "updated_at" })
  updatedAt: Date;

  // Column for storing the refresh token of the user (nullable)
  @Column({ nullable: true, name: "refresh_token" })
  refreshToken?: string;

  // Column for storing the reset code of the user (default is a random UUID)
  @Column({ name: "reset_code", default: randomUUID() })
  resetCode: string;

  // One-to-Many relationship with Income entity
  @OneToMany(() => Income, (income) => income.user)
  income: Income[];

  // One-to-Many relationship with Category entity
  @OneToMany(() => Category, (category) => category.user)
  category: Category[];

  // One-to-Many relationship with Budget entity
  @OneToMany(() => Budget, (budget) => budget.user)
  budget: Budget[];

  // One-to-Many relationship with Expense entity
  @OneToMany(() => Expense, (expense) => expense.user)
  expense: Expense[];
}
