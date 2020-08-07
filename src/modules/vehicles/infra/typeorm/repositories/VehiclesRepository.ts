import { Repository, getRepository } from 'typeorm';

import IVehiclesRepository from '@modules/vehicles/repositories/IVehiclesRepository';
import ICreateVehicleDTO from '@modules/vehicles/dtos/ICreateVehicleDTO';

import Vehicle from '../entities/Vehicle';

export default class VehiclesRepository implements IVehiclesRepository {
  private ormRepository: Repository<Vehicle>;

  constructor() {
    this.ormRepository = getRepository(Vehicle);
  }

  public async create({
    fuel,
    model_id,
    value,
    year_model,
  }: ICreateVehicleDTO): Promise<Vehicle> {
    const vehicle = this.ormRepository.create({
      fuel,
      model_id,
      value,
      year_model,
    });

    await this.ormRepository.save(vehicle);

    return vehicle;
  }

  public async findById(id: number): Promise<Vehicle | undefined> {
    const vehicle = await this.ormRepository.findOne(id);

    return vehicle;
  }

  public async findAllWithSameModel(model_id: number): Promise<Vehicle[]> {
    const vehicles = await this.ormRepository.find({
      where: {
        model_id,
      },
    });

    return vehicles;
  }

  public async save(vehicle: Vehicle): Promise<Vehicle> {
    return this.ormRepository.save(vehicle);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}
