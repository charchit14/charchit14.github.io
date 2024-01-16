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

// Importing User entity for establishing the Many-to-One relationship
import User from "./User";

// Defining the entity for the "categories" table
@Entity("categories")
export default class Category {
  // Primary key column with UUID generation
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // Column for category title
  @Column()
  title: string;

  // Column for category description
  @Column()
  description: string;

  // Many-to-One relationship with User entity, establishing foreign key relationship
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  @RelationId((category: Category) => category.user)
  user: User;

  // Column for storing the creation timestamp of the category
  @CreateDateColumn({ default: new Date(), name: "created_at", update: false })
  createdAt: Date;

  // Column for storing the last update timestamp of the category
  @UpdateDateColumn({ default: new Date(), name: "updated_at" })
  updatedAt: Date;
}
