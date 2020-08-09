import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateVehicleService from '@modules/vehicles/services/CreateVehicleService';
import RetrieveVehiclesListByModelService from '@modules/vehicles/services/RetrieveVehiclesListByModelService';
import RetrieveVehicleByIdService from '@modules/vehicles/services/RetrieveVehicleByIdService';

import AppError from '@shared/errors/AppError';
import UpdatedVehicleService from '@modules/vehicles/services/UpdateVehicleService';
import DeleteVehicleService from '@modules/vehicles/services/DeleteVehicleService';

export default class VehiclesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { model_id } = request.query;
    if (!model_id) throw new AppError('Invalid model_id!');

    const listVehicles = container.resolve(RetrieveVehiclesListByModelService);

    const vehicles = await listVehicles.execute({
      model_id: parseInt(model_id.toString(), 10),
    });

    return response.json(classToClass(vehicles));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { vehicle_id } = request.params;

    const showVehicle = container.resolve(RetrieveVehicleByIdService);

    const vehicle = await showVehicle.execute({ id: parseInt(vehicle_id, 10) });

    return response.json(classToClass(vehicle));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { vehicle_id } = request.params;
    const { fuel, model_id, value, year_model } = request.body;

    const updateVehicle = container.resolve(UpdatedVehicleService);

    const vehicle = await updateVehicle.execute({
      id: parseInt(vehicle_id, 10),
      fuel,
      model_id,
      value,
      year_model,
    });

    return response.json(classToClass(vehicle));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { fuel, model_id, value, year_model } = request.body;

    const createVehicle = container.resolve(CreateVehicleService);

    const vehicle = await createVehicle.execute({
      fuel,
      model_id,
      value,
      year_model,
    });

    return response.json(classToClass(vehicle));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { module_id } = request.params;

    const deleteVehicle = container.resolve(DeleteVehicleService);

    await deleteVehicle.execute({ id: parseInt(module_id, 10) });

    return response.status(204).json();
  }
}
