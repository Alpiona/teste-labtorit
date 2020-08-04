import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import Brand from '@modules/brands/infra/typeorm/entities/Brand';

interface IRequest {
  id: number;
  name: string;
}

@injectable()
export default class UpdateBrandService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ) {}

  public async execute({ id, name }: IRequest): Promise<Brand> {
    const brand = await this.brandsRepository.findById(id);

    if (!brand) throw new AppError('Brand not found');

    brand.name = name;

    this.brandsRepository.save(brand);

    return brand;
  }
}
