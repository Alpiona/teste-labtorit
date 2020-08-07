import FakeModelsRepository from '@modules/models/repositories/fakes/FakeModelsRepository';
import FakeVehiclesRepository from '../repositories/fakes/FakeVehiclesRepository';
import RetrieveVehiclesListByModelService from './RetrieveVehiclesListByModelService';

let fakeModelsRepository: FakeModelsRepository;
let fakeVehiclesRepository: FakeVehiclesRepository;
let retrieveVehiclesListService: RetrieveVehiclesListByModelService;

describe('RetrieveVehiclesListByModel', () => {
  beforeEach(() => {
    fakeModelsRepository = new FakeModelsRepository();
    fakeVehiclesRepository = new FakeVehiclesRepository();

    retrieveVehiclesListService = new RetrieveVehiclesListByModelService(
      fakeModelsRepository,
      fakeVehiclesRepository,
    );
  });

  it('should be able to retrieve the list of vehicles of same model', async () => {
    const model1 = await fakeModelsRepository.create({
      brand_id: 1,
      name: 'Model Name Test',
    });

    const model2 = await fakeModelsRepository.create({
      brand_id: 1,
      name: 'Model Name Test 2',
    });

    const vehicle1 = await fakeVehiclesRepository.create({
      fuel: 'Vehicle Fuel Test',
      model_id: model1.id,
      value: 1000,
      year_model: 2000,
    });

    const vehicle2 = await fakeVehiclesRepository.create({
      fuel: 'Vehicle Fuel Test 2',
      model_id: model1.id,
      value: 1500,
      year_model: 2020,
    });

    await fakeVehiclesRepository.create({
      fuel: 'Vehicle Fuel Test 3',
      model_id: model2.id,
      value: 2000,
      year_model: 2010,
    });

    const vehicles = await retrieveVehiclesListService.execute({
      model_id: model1.id,
    });

    expect(vehicles).toEqual([vehicle1, vehicle2]);
  });

  it('should be able to retrieve the list of vehicles without the deleted vehicles', async () => {
    const model = await fakeModelsRepository.create({
      brand_id: 1,
      name: 'Model Name Test',
    });

    const vehicle1 = await fakeVehiclesRepository.create({
      fuel: 'Vehicle Fuel Test',
      model_id: model.id,
      value: 1000,
      year_model: 2000,
    });

    const vehicle2 = await fakeVehiclesRepository.create({
      fuel: 'Vehicle Fuel Test 2',
      model_id: model.id,
      value: 1500,
      year_model: 2020,
    });

    await fakeVehiclesRepository.delete(vehicle1.id);

    const vehicles = await retrieveVehiclesListService.execute({
      model_id: model.id,
    });

    expect(vehicles).toEqual([vehicle2]);
  });
});
