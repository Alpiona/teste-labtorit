import AppError from '@shared/errors/AppError';

import FakeVehiclesRepository from '../repositories/fakes/FakeVehiclesRepository';
import RetrieveVehicleByIdService from './RetrieveVehicleByIdService';

let fakeVehiclesRepository: FakeVehiclesRepository;
let retrieveVehicleByIdService: RetrieveVehicleByIdService;

describe('RetrieveVehicleById', () => {
  beforeEach(() => {
    fakeVehiclesRepository = new FakeVehiclesRepository();

    retrieveVehicleByIdService = new RetrieveVehicleByIdService(
      fakeVehiclesRepository,
    );
  });

  it('should be able to retrieve the vehicle using the ID', async () => {
    const createdVehicle = await fakeVehiclesRepository.create({
      fuel: 'Vehicle Fuel Test',
      model_id: 1,
      value: 1000,
      year_model: 2001,
    });

    const vehicle = await retrieveVehicleByIdService.execute({
      id: createdVehicle.id,
    });

    expect(vehicle.fuel).toBe('Vehicle Fuel Test');
  });

  it('should not be able to retrieve a vehicle with invalid ID', async () => {
    await expect(
      retrieveVehicleByIdService.execute({
        id: 123,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
