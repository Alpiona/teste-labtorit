import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteBrandService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    try {
      await this.brandsRepository.delete(id);
    } catch {
      throw new AppError('Brand not found');
    }
  }
}
