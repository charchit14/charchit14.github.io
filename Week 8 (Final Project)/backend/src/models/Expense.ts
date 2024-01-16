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

// Importing User and Category entities for establishing relationships
import User from "./User";
import Category from "./Category";

// Defining the entity for the "expenses" table
@Entity("expenses")
export default class Expense {
  // Primary key column with UUID generation
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // Column for storing the expense amount
  @Column("float")
  amount: number;

  // Column for storing the date of the expense
  @Column({ type: "date" })
  date: Date;

  // Column for storing the description of the expense
  @Column()
  description: string;

  // Column for storing the filename of an image associated with the expense (default is an empty string)
  @Column({ default: "" })
  image: string;

  // Many-to-One relationship with User entity, establishing foreign key relationship
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @RelationId((expense: Expense) => expense.user)
  @JoinColumn({ name: "user_id" })
  user: User;

  // Many-to-One relationship with Category entity, establishing foreign key relationship (with ON DELETE SET NULL)
  @ManyToOne(() => Category, { onDelete: "SET NULL" })
  @RelationId((expense: Expense) => expense.category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  // Column for storing the creation timestamp of the expense
  @CreateDateColumn({ default: new Date(), name: "created_at", update: false })
  createdAt: Date;

  // Column for storing the last update timestamp of the expense
  @UpdateDateColumn({ default: new Date(), name: "updated_at" })
  updatedAt: Date;
}
