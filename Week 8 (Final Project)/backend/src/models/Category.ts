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

@Entity("categories")
export default class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  @RelationId((category: Category) => category.user)
  user: User;
  @CreateDateColumn({ default: new Date(), name: "created_at", update: false })
  createdAt: Date;
  @UpdateDateColumn({ default: new Date(), name: "updated_at" })
  updatedAt: Date;
}
