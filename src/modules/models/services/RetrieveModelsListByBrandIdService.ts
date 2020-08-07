import { injectable, inject } from 'tsyringe';

import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import IModelsRepository from '../repositories/IModelsRepository';

import Model from '../infra/typeorm/entities/Model';

interface IRequest {
  brand_id: number;
}

@injectable()
export default class RetrieveModelsListByBrandIdService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,

    @inject('ModelsRepository')
    private modelsRepository: IModelsRepository,
  ) {}

  public async execute({ brand_id }: IRequest): Promise<Model[]> {
    const models = await this.modelsRepository.findAllByBrandId(brand_id);

    return models;
  }
}
