import AppError from '@shared/errors/AppError';

import FakeBrandsRepository from '@modules/brands/repositories/fakes/FakeBrandsRepository';
import FakeModelsRepository from '../repositories/fakes/FakeModelsRepository';
import UpdateModelService from './UpdateModelService';

let fakeBrandsRepository: FakeBrandsRepository;
let fakeModelsRepository: FakeModelsRepository;
let updateModelService: UpdateModelService;

describe('UpdateModelById', () => {
  beforeEach(() => {
    fakeBrandsRepository = new FakeBrandsRepository();
    fakeModelsRepository = new FakeModelsRepository();

    updateModelService = new UpdateModelService(
      fakeBrandsRepository,
      fakeModelsRepository,
    );
  });

  it('should be able to update the model name using the ID', async () => {
    const brand = await fakeBrandsRepository.create({
      name: 'Brand Name Test',
    });

    const model = await fakeModelsRepository.create({
      name: 'Model Name Test',
      brand_id: brand.id,
    });

    await updateModelService.execute({
      id: model.id,
      name: 'Model Name Test 2',
      brand_id: brand.id,
    });

    const updatedModel = await fakeModelsRepository.findById(model.id);

    expect(updatedModel?.name).toBe('Model Name Test 2');
  });

  it('should be able to update the model brand_id using the ID', async () => {
    const brand1 = await fakeBrandsRepository.create({
      name: 'Brand Name Test',
    });

    const brand2 = await fakeBrandsRepository.create({
      name: 'Brand Name Test 2',
    });

    const model = await fakeModelsRepository.create({
      name: 'Model Name Test',
      brand_id: brand1.id,
    });

    await updateModelService.execute({
      id: model.id,
      name: 'Model Name Test',
      brand_id: brand2.id,
    });

    const updatedModel = await fakeModelsRepository.findById(model.id);

    expect(updatedModel?.brand_id).toBe(brand2.id);
  });

  it('should not be able to update a model using invalid ID', async () => {
    const brand = await fakeBrandsRepository.create({
      name: 'Brand Name Test',
    });

    await expect(
      updateModelService.execute({
        id: 123,
        name: 'Model Name Test',
        brand_id: brand.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a model with invalid brand_id using ID', async () => {
    const brand = await fakeBrandsRepository.create({
      name: 'Brand Name Test',
    });

    const model = await fakeModelsRepository.create({
      name: 'Model Name Test',
      brand_id: brand.id,
    });

    await expect(
      updateModelService.execute({
        id: model.id,
        name: 'Model Name Test',
        brand_id: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
