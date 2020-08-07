import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IVehicleService from '@modules/vehicles/repositories/IVehiclesRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteVehicleService {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehicleService,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    try {
      await this.vehiclesRepository.delete(id);
    } catch {
      throw new AppError('Vehicle not found');
    }
  }
}
