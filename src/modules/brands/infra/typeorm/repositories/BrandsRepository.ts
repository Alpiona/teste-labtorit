import { Repository, getRepository } from 'typeorm';

import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';

import ICreateBrandDTO from '@modules/brands/dtos/ICreateBrandDTO';
import Brand from '../entities/Brand';

export default class BrandsRepository implements IBrandsRepository {
  private ormRepository: Repository<Brand>;

  constructor() {
    this.ormRepository = getRepository(Brand);
  }

  public async create({ name }: ICreateBrandDTO): Promise<Brand> {
    const brand = this.ormRepository.create({ name });

    await this.ormRepository.save(brand);

    return brand;
  }

  public async findById(id: number): Promise<Brand | undefined> {
    const brand = await this.ormRepository.findOne(id);

    return brand;
  }

  public async findByName(name: string): Promise<Brand | undefined> {
    const brand = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return brand;
  }

  public async findAll(): Promise<Brand[]> {
    const brands = await this.ormRepository.find();

    return brands;
  }

  public async save(brand: Brand): Promise<Brand> {
    return this.ormRepository.save(brand);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}
