import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IVehiclesRepository from '@modules/vehicles/repositories/IVehiclesRepository';
import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';
import IModelsRepository from '@modules/models/repositories/IModelsRepository';

interface IRequest {
  id: number;
  value: number;
  model_id: number;
  year_model: number;
  fuel: string;
}

@injectable()
export default class UpdatedVehicleService {
  constructor(
    @inject('ModelsRepository')
    private modelsRepository: IModelsRepository,

    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,
  ) {}

  public async execute({
    id,
    value,
    fuel,
    year_model,
    model_id,
  }: IRequest): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findById(id);
    if (!vehicle) {
      throw new AppError('Vehicle not found');
    }

    if (model_id !== vehicle.model_id) {
      const model = await this.modelsRepository.findById(model_id);
      if (!model) throw new AppError('No model found with the model_id used');

      vehicle.model_id = model_id;
    }

    vehicle.value = value;
    vehicle.fuel = fuel;
    vehicle.year_model = year_model;

    await this.vehiclesRepository.save(vehicle);

    return vehicle;
  }
}
