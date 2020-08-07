import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IModelsRepository from '@modules/models/repositories/IModelsRepository';
import IVehiclesRepository from '../repositories/IVehiclesRepository';
import Vehicle from '../infra/typeorm/entities/Vehicle';

interface IRequest {
  model_id: number;
  value: number;
  year_model: number;
  fuel: string;
}

@injectable()
export default class CreateVehicleService {
  constructor(
    @inject('ModelsRepository')
    private modelsRepository: IModelsRepository,

    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,
  ) {}

  public async execute({
    fuel,
    model_id,
    value,
    year_model,
  }: IRequest): Promise<Vehicle> {
    const model = await this.modelsRepository.findById(model_id);
    if (!model) throw new AppError('Model with this model_id not found');

    const vehicle = await this.vehiclesRepository.create({
      fuel,
      model_id,
      value,
      year_model,
    });

    return vehicle;
  }
}
