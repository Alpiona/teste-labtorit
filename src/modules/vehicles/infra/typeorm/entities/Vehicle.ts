import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import Brand from '@modules/brands/infra/typeorm/entities/Brand';
import Model from '@modules/models/infra/typeorm/entities/Model';

@Entity('vehicles')
export default class Vehicle {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  value: number;

  // @Column()
  // brand_id: number;

  // @ManyToOne(() => Brand)
  // @JoinColumn({ name: 'brand_id' })
  // brand: Brand;

  @Column()
  model_id: number;

  @ManyToOne(() => Model)
  @JoinColumn({ name: 'model_id' })
  model: Model;

  @Column()
  year_model: number;

  @Column()
  fuel: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
