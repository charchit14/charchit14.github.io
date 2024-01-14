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
import Category from "./Category";
import User from "./User";

@Entity("budgets")
export default class Budget {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  title: string;
  @Column("float")
  amount: number;
  @Column({ name: "start_time", type: "date" })
  startTime: Date;
  @Column({ name: "end_time", type: "date" })
  endTime: Date;
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @RelationId((budget: Budget) => budget.user)
  @JoinColumn({ name: "user_id" })
  user: User;
  @ManyToOne(() => Category, { onDelete: "CASCADE" })
  @RelationId((budget: Budget) => budget.category)
  @JoinColumn({ name: "category_id" })
  category: Category;
  @CreateDateColumn({ default: new Date(), name: "created_at", update: false })
  createdAt: Date;
  @UpdateDateColumn({ default: new Date(), name: "updated_at" })
  updatedAt: Date;
  @Column({ name: "remaining_amount", default: 0 })
  remainingAmount: number;
  @Column({ name: "spent_amount", default: 0 })
  spentAmount: number;
}
