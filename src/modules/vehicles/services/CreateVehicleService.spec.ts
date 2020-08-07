import AppError from '@shared/errors/AppError';

import FakeBrandsRepository from '@modules/brands/repositories/fakes/FakeBrandsRepository';
import FakeModelsRepository from '@modules/models/repositories/fakes/FakeModelsRepository';
import FakeVehiclesRepository from '../repositories/fakes/FakeVehiclesRepository';
import CreateVehicleService from './CreateVehicleService';

let fakeModelsRepository: FakeModelsRepository;
let fakeVehiclesRepository: FakeVehiclesRepository;
let createVehicleService: CreateVehicleService;

describe('CreateVehicle', () => {
  beforeEach(() => {
    fakeModelsRepository = new FakeModelsRepository();
    fakeVehiclesRepository = new FakeVehiclesRepository();

    createVehicleService = new CreateVehicleService(
      fakeModelsRepository,
      fakeVehiclesRepository,
    );
  });

  it('should be able to create a new vehicle', async () => {
    const model = await fakeModelsRepository.create({
      name: 'Model Name Test',
      brand_id: 1,
    });

    const vehicle = await createVehicleService.execute({
      model_id: model.id,
      fuel: 'Vehicle Fuel Test',
      value: 1000,
      year_model: 2001,
    });

    expect(vehicle).toHaveProperty('id');
  });

  it('should not be able to create a new vehicle with unused model_id', async () => {
    await expect(
      createVehicleService.execute({
        model_id: 1,
        fuel: 'Vehicle Fuel Test',
        value: 1000,
        year_model: 2001,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
