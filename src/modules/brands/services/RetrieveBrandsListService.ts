import { injectable, inject } from 'tsyringe';

import IBrandsRepository from '../repositories/IBrandsRepository';
import Brand from '../infra/typeorm/entities/Brand';

@injectable()
export default class RetrieveBrandsListService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ) {}

  public async execute(): Promise<Brand[]> {
    const brands = await this.brandsRepository.findAll();

    return brands;
  }
}
