import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import IModelsRepository from '../repositories/IModelsRepository';

import Model from '../infra/typeorm/entities/Model';

interface IRequest {
  id: number;
  name: string;
  brand_id: number;
}

@injectable()
export default class UpdateModelService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,

    @inject('ModelsRepository')
    private modelsRepository: IModelsRepository,
  ) {}

  public async execute({ id, name, brand_id }: IRequest): Promise<Model> {
    const model = await this.modelsRepository.findById(id);
    if (!model) throw new AppError('Model not found');

    if (brand_id !== model.brand_id) {
      const brand = await this.brandsRepository.findById(brand_id);

      if (brand) {
        model.brand_id = brand_id;
      } else {
        throw new AppError('Could not found the brand with the brand_id used');
      }
    }

    model.name = name;

    this.modelsRepository.save(model);

    return model;
  }
}
