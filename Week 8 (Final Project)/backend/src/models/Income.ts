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

// Importing User entity for establishing relationships
import User from "./User";

// Defining the entity for the "income" table
@Entity("income")
export default class Income {
  // Primary key column with UUID generation
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // Column for storing the source of the income
  @Column()
  source: string;

  // Column for storing the income amount
  @Column("float")
  amount: number;

  // Column for storing the date of the income (default is the current date)
  @Column({ type: "date", default: new Date() })
  date: Date;

  // Many-to-One relationship with User entity, establishing foreign key relationship
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @RelationId((income: Income) => income.user)
  @JoinColumn({ name: "user_id" })
  user: User;

  // Column for storing the creation timestamp of the income
  @CreateDateColumn({ default: new Date(), name: "created_at", update: false })
  createdAt: Date;

  // Column for storing the last update timestamp of the income
  @UpdateDateColumn({ default: new Date(), name: "updated_at" })
  updatedAt: Date;
}
