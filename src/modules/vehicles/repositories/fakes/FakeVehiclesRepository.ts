import ICreateVehicleDTO from '@modules/vehicles/dtos/ICreateVehicleDTO';
import Vehicle from '@modules/vehicles/infra/typeorm/entities/Vehicle';
import IVehiclesRepository from '../IVehiclesRepository';

export default class VehiclesRepository implements IVehiclesRepository {
  private vehicles: Vehicle[] = [];

  public async create({
    fuel,
    model_id,
    value,
    year_model,
  }: ICreateVehicleDTO): Promise<Vehicle> {
    const vehicle = new Vehicle();

    Object.assign(vehicle, {
      id: this.vehicles.length + 1,
      fuel,
      model_id,
      value,
      year_model,
    });

    this.vehicles.push(vehicle);

    return vehicle;
  }

  public async findById(id: number): Promise<Vehicle | undefined> {
    const findVehicle = this.vehicles.find(v => v.id === id && !v.deleted_at);

    return findVehicle;
  }

  public async findAllWithSameModel(model_id: number): Promise<Vehicle[]> {
    return this.vehicles.filter(v => v.model_id === model_id && !v.deleted_at);
  }

  public async save(vehicle: Vehicle): Promise<Vehicle> {
    const vehicleIndex = this.vehicles.findIndex(v => v.id === vehicle.id);

    this.vehicles[vehicleIndex] = vehicle;

    return vehicle;
  }

  public async delete(id: number): Promise<void> {
    const vehicleIndex = this.vehicles.findIndex(
      v => v.id === id && !v.deleted_at,
    );

    this.vehicles[vehicleIndex].deleted_at = new Date();
  }
}
