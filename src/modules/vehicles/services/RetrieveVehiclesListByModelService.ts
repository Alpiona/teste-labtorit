import { injectable, inject } from 'tsyringe';

import IModelsRepository from '@modules/models/repositories/IModelsRepository';
import Vehicle from '../infra/typeorm/entities/Vehicle';
import IVehiclesRepository from '../repositories/IVehiclesRepository';

interface IRequest {
  model_id: number;
}

@injectable()
export default class RetrieveVehiclesListByModelService {
  constructor(
    @inject('ModelsRepository')
    private modelsRepository: IModelsRepository,

    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,
  ) {}

  public async execute({ model_id }: IRequest): Promise<Vehicle[]> {
    const vehicles = await this.vehiclesRepository.findAllWithSameModel(
      model_id,
    );

    return vehicles;
  }
}
