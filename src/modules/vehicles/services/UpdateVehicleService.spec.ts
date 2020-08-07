import AppError from '@shared/errors/AppError';

import FakeModelsRepository from '@modules/models/repositories/fakes/FakeModelsRepository';
import FakeVehiclesRepository from '../repositories/fakes/FakeVehiclesRepository';
import UpdatedVehicleService from './UpdateVehicleService';

let fakeModelsRepository: FakeModelsRepository;
let fakeVehiclesRepository: FakeVehiclesRepository;
let updateVehicleService: UpdatedVehicleService;

describe('UpdateVehicle', () => {
  beforeEach(() => {
    fakeModelsRepository = new FakeModelsRepository();
    fakeVehiclesRepository = new FakeVehiclesRepository();

    updateVehicleService = new UpdatedVehicleService(
      fakeModelsRepository,
      fakeVehiclesRepository,
    );
  });

  it('should be able to update the vehicle fuel using the ID', async () => {
    const createdModel = await fakeModelsRepository.create({
      name: 'Model Name Test',
      brand_id: 1,
    });

    const createdVehicle = await fakeVehiclesRepository.create({
      fuel: 'Vehicle Fuel Test',
      model_id: createdModel.id,
      value: 1000,
      year_model: 2001,
    });

    await updateVehicleService.execute({
      id: createdVehicle.id,
      fuel: 'Vehicle Fuel Test2',
      value: 1000,
      year_model: 2001,
      model_id: createdModel.id,
    });

    const vehicle = await fakeVehiclesRepository.findById(createdVehicle.id);

    expect(vehicle?.fuel).toBe('Vehicle Fuel Test2');
  });

  it('should be able to update the vehicle value using the ID', async () => {
    const createdModel = await fakeModelsRepository.create({
      name: 'Model Name Test',
      brand_id: 1,
    });

    const createdVehicle = await fakeVehiclesRepository.create({
      fuel: 'Vehicle Fuel Test',
      model_id: createdModel.id,
      value: 1000,
      year_model: 2001,
    });

    await updateVehicleService.execute({
      id: createdVehicle.id,
      fuel: 'Vehicle Fuel Test',
      value: 1500,
      year_model: 2001,
      model_id: createdModel.id,
    });

    const vehicle = await fakeVehiclesRepository.findById(createdVehicle.id);

    expect(vehicle?.value).toBe(1500);
  });

  it('should be able to update the vehicle year_model using the ID', async () => {
    const createdModel = await fakeModelsRepository.create({
      name: 'Model Name Test',
      brand_id: 1,
    });

    const createdVehicle = await fakeVehiclesRepository.create({
      fuel: 'Vehicle Fuel Test',
      model_id: createdModel.id,
      value: 1000,
      year_model: 2001,
    });

    await updateVehicleService.execute({
      id: createdVehicle.id,
      fuel: 'Vehicle Fuel Test',
      value: 1000,
      year_model: 2020,
      model_id: createdModel.id,
    });

    const vehicle = await fakeVehiclesRepository.findById(createdVehicle.id);

    expect(vehicle?.year_model).toBe(2020);
  });

  it('should be able to update the vehicle model_id using the ID', async () => {
    const createdModel = await fakeModelsRepository.create({
      name: 'Model Name Test',
      brand_id: 1,
    });

    const createdModel2 = await fakeModelsRepository.create({
      name: 'Model Name Test 2',
      brand_id: 1,
    });

    const createdVehicle = await fakeVehiclesRepository.create({
      fuel: 'Vehicle Fuel Test',
      model_id: createdModel.id,
      value: 1000,
      year_model: 2001,
    });

    await updateVehicleService.execute({
      id: createdVehicle.id,
      fuel: 'Vehicle Fuel Test',
      value: 1000,
      year_model: 2001,
      model_id: createdModel2.id,
    });

    const vehicle = await fakeVehiclesRepository.findById(createdVehicle.id);

    expect(vehicle?.model_id).toBe(createdModel2.id);
  });

  it('should not be able to update vehicle with invalid ID', async () => {
    const createdModel = await fakeModelsRepository.create({
      name: 'Model Name Test',
      brand_id: 1,
    });
    await expect(
      updateVehicleService.execute({
        id: 123,
        fuel: 'Vehicle Fuel Test',
        model_id: createdModel.id,
        value: 1000,
        year_model: 2001,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update vehicle with invalid model_id', async () => {
    const createdModel = await fakeModelsRepository.create({
      name: 'Model Name Test',
      brand_id: 1,
    });
    const vehicle = await fakeVehiclesRepository.create({
      fuel: 'Vehicle Fuel Test',
      model_id: createdModel.id,
      value: 1000,
      year_model: 2001,
    });

    await expect(
      updateVehicleService.execute({
        id: vehicle.id,
        fuel: 'Vehicle Fuel Test',
        model_id: createdModel.id + 1,
        value: 1000,
        year_model: 2001,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
