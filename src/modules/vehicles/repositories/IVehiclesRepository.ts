import ICreateVehicleDTO from '../dtos/ICreateVehicleDTO';
import Vehicle from '../infra/typeorm/entities/Vehicle';

export default interface IVehiclesRepository {
  create(data: ICreateVehicleDTO): Promise<Vehicle>;
  findById(id: number): Promise<Vehicle | undefined>;
  findAllWithSameModel(model_id: number): Promise<Vehicle[]>;
  save(vehicle: Vehicle): Promise<Vehicle>;
  delete(id: number): Promise<void>;
}
