// Importing necessary decorators and modules from TypeORM
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from "typeorm";

// Importing related entities for establishing relationships
import Category from "./Category";
import User from "./User";

// Defining the entity for the "budgets" table
@Entity("budgets")
export default class Budget {
  // Primary key column with UUID generation
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // Column for budget title
  @Column()
  title: string;

  // Column for the budget amount (floating-point number)
  @Column("float")
  amount: number;

  // Columns for start and end times of the budget (date type)
  @Column({ name: "start_time", type: "date" })
  startTime: Date;
  @Column({ name: "end_time", type: "date" })
  endTime: Date;

  // Many-to-One relationship with User entity, establishing foreign key relationship
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @RelationId((budget: Budget) => budget.user)
  @JoinColumn({ name: "user_id" })
  user: User;

  // Many-to-One relationship with Category entity, establishing foreign key relationship
  @ManyToOne(() => Category, { onDelete: "CASCADE" })
  @RelationId((budget: Budget) => budget.category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  // Column for storing the creation timestamp of the budget
  @CreateDateColumn({ default: new Date(), name: "created_at", update: false })
  createdAt: Date;

  // Column for storing the last update timestamp of the budget
  @UpdateDateColumn({ default: new Date(), name: "updated_at" })
  updatedAt: Date;

  // Column for storing the remaining amount in the budget (default value: 0)
  @Column({ name: "remaining_amount", default: 0 })
  remainingAmount: number;

  // Column for storing the spent amount in the budget (default value: 0)
  @Column({ name: "spent_amount", default: 0 })
  spentAmount: number;
}
