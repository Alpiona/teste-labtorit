import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import Brand from '@modules/brands/infra/typeorm/entities/Brand';

@Entity('models')
export default class Model {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  @Exclude()
  brand_id: number;

  @ManyToOne(() => Brand, brand => brand.name, { eager: true })
  @JoinColumn({ name: 'brand_id' })
  @Exclude()
  brand: Brand;

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
