import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import Brand from '@modules/brands/infra/typeorm/entities/Brand';

interface IRequest {
  name: string;
}

@injectable()
export default class CreateBrandService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Brand> {
    const checkName = await this.brandsRepository.findByName(name);

    if (checkName)
      throw new AppError('There is already a brand with that name');

    const brand = await this.brandsRepository.create({ name });

    return brand;
  }
}
