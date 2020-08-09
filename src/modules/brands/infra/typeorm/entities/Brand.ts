import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('brands')
export default class Brand {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @DeleteDateColumn()
  @Exclude()
  deleted_at: Date;
}
