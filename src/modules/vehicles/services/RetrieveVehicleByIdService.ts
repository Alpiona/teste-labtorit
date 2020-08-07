import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IVehiclesRepository from '../repositories/IVehiclesRepository';
import Vehicle from '../infra/typeorm/entities/Vehicle';

interface IRequest {
  id: number;
}

@injectable()
export default class RetrieveBrandByIdService {
  constructor(
    @inject('VehiclesRespository')
    private vehiclesRepository: IVehiclesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findById(id);

    if (!vehicle) throw new AppError('Vehicle not found');

    return vehicle;
  }
}
