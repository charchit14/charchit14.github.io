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
import User from "./User";
import Category from "./Category";

@Entity("expenses")
export default class Expense {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column("float")
  amount: number;
  @Column({ type: "date" })
  date: Date;
  @Column()
  description: string;
  @Column({ default: "" })
  image: string;
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @RelationId((expense: Expense) => expense.user)
  @JoinColumn({name: "user_id"})
  user: User;
  @ManyToOne(() => Category, { onDelete: "SET NULL" })
  @RelationId((expense: Expense) => expense.category)
  @JoinColumn({name: "category_id"})
  category: Category;
  @CreateDateColumn({ default: new Date(), name: "created_at", update: false })
  createdAt: Date;
  @UpdateDateColumn({ default: new Date(), name: "updated_at" })
  updatedAt: Date;
}
