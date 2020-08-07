import AppError from '@shared/errors/AppError';

import FakeVehiclesRepository from '../repositories/fakes/FakeVehiclesRepository';
import DeleteVehicleService from './DeleteVehicleService';

let fakeVehiclesRepository: FakeVehiclesRepository;
let deleteVehicleService: DeleteVehicleService;

describe('DeleteVehicle', () => {
  beforeEach(() => {
    fakeVehiclesRepository = new FakeVehiclesRepository();

    deleteVehicleService = new DeleteVehicleService(fakeVehiclesRepository);
  });

  it('should be able to delete the vehicle using the ID', async () => {
    const createdVehicle = await fakeVehiclesRepository.create({
      fuel: 'Vehicle Fuel Test',
      model_id: 1,
      value: 1000,
      year_model: 2001,
    });

    await deleteVehicleService.execute({
      id: createdVehicle.id,
    });

    const vehicle = await fakeVehiclesRepository.findById(createdVehicle.id);

    expect(vehicle).toBeUndefined();
  });

  it('should not be able to delete vehicle with invalid ID', async () => {
    await expect(
      deleteVehicleService.execute({
        id: 123,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
