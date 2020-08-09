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

import Model from '@modules/models/infra/typeorm/entities/Model';
import { Exclude, Expose } from 'class-transformer';

@Entity('vehicles')
export default class Vehicle {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Exclude()
  value: number;

  @Expose({ name: 'value' })
  getValueFormated(): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(this.value);
  }

  @Expose({ name: 'brand' })
  getBrandName(): string {
    return this.model.brand.name;
  }

  @Column()
  @Exclude()
  model_id: number;

  @ManyToOne(() => Model, { eager: true })
  @JoinColumn({ name: 'model_id' })
  @Exclude()
  model: Model;

  @Expose({ name: 'model' })
  getModelName(): string {
    return this.model.name;
  }

  @Column()
  year_model: number;

  @Column()
  fuel: string;

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
