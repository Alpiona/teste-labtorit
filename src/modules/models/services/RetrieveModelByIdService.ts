import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IModelsRepository from '../repositories/IModelsRepository';

import Model from '../infra/typeorm/entities/Model';

interface IRequest {
  id: number;
}

@injectable()
export default class RetrieveModelByIdService {
  constructor(
    @inject('ModelsRepository')
    private modelsRepository: IModelsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Model> {
    const model = await this.modelsRepository.findById(id);

    if (!model) throw new AppError('Model not found');

    return model;
  }
}
