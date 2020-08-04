import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IBrandsRepository from '../repositories/IBrandsRepository';
import Brand from '../infra/typeorm/entities/Brand';

interface IRequest {
  id: number;
}

@injectable()
export default class RetrieveBrandByIdService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Brand> {
    const brand = await this.brandsRepository.findById(id);

    if (!brand) throw new AppError('Brand not found');

    return brand;
  }
}
