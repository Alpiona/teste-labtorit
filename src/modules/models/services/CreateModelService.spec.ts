import AppError from '@shared/errors/AppError';

import FakeBrandsRepository from '@modules/brands/repositories/fakes/FakeBrandsRepository';

import FakeModelsRepository from '../repositories/fakes/FakeModelsRepository';
import CreateModelService from './CreateModelService';

let fakeBrandsRepository: FakeBrandsRepository;
let fakeModelsRepository: FakeModelsRepository;
let createModelService: CreateModelService;

describe('CreateModel', () => {
  beforeEach(() => {
    fakeBrandsRepository = new FakeBrandsRepository();
    fakeModelsRepository = new FakeModelsRepository();

    createModelService = new CreateModelService(
      fakeBrandsRepository,
      fakeModelsRepository,
    );
  });

  it('should be able to create new model', async () => {
    const brand = await fakeBrandsRepository.create({
      name: 'Brand Name Test',
    });

    const model = await createModelService.execute({
      name: 'Model Name Test',
      brand_id: brand.id,
    });

    expect(model).toHaveProperty('id');
  });

  it('should not be able to create new model with same name', async () => {
    const brand = await fakeBrandsRepository.create({
      name: 'Brand Name Test',
    });

    await fakeModelsRepository.create({
      name: 'Model Name Test',
      brand_id: brand.id,
    });

    await expect(
      createModelService.execute({
        name: 'Model Name Test',
        brand_id: brand.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create new model with unused brand ID', async () => {
    await expect(
      createModelService.execute({
        name: 'Brand Name Test',
        brand_id: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
