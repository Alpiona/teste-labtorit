import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import IModelsRepository from '@modules/models/repositories/IModelsRepository';
import Model from '@modules/models/infra/typeorm/entities/Model';

interface IRequest {
  name: string;
  brand_id: number;
}

@injectable()
export default class CreateBrandService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,

    @inject('ModelsRepository')
    private modelsRepository: IModelsRepository,
  ) {}

  public async execute({ name, brand_id }: IRequest): Promise<Model> {
    const checkName = await this.modelsRepository.findByName(name);
    if (checkName) {
      throw new AppError('There is already a model with this name');
    }

    const checkBrand = await this.brandsRepository.findById(brand_id);
    if (!checkBrand) {
      throw new AppError('There is no brand with this id');
    }

    const model = await this.modelsRepository.create({ name, brand_id });

    return model;
  }
}
