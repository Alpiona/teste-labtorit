import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IModelsRepository from '../repositories/IModelsRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteModelService {
  constructor(
    @inject('ModelsRepository')
    private modelsRepository: IModelsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    try {
      await this.modelsRepository.delete(id);
    } catch {
      throw new AppError('Model not found');
    }
  }
}
