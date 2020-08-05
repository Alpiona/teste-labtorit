import AppError from '@shared/errors/AppError';

import FakeBrandsRepository from '@modules/brands/repositories/fakes/FakeBrandsRepository';
import FakeModelsRepository from '../repositories/fakes/FakeModelsRepository';
import RetrieveModelsListByBrandIdService from './RetrieveModelsListByBrandIdService';

let fakeBrandsRepository: FakeBrandsRepository;
let fakeModelsRepository: FakeModelsRepository;
let retrieveModelsListByBrandIdService: RetrieveModelsListByBrandIdService;

describe('RetrieveBrandsList', () => {
  beforeEach(() => {
    fakeBrandsRepository = new FakeBrandsRepository();
    fakeModelsRepository = new FakeModelsRepository();

    retrieveModelsListByBrandIdService = new RetrieveModelsListByBrandIdService(
      fakeBrandsRepository,
      fakeModelsRepository,
    );
  });

  it('should be able to retrieve the list of models using the brand ID', async () => {
    const brand1 = await fakeBrandsRepository.create({
      name: 'Brand Name Test',
    });

    const brand2 = await fakeBrandsRepository.create({
      name: 'Brand Name Test 2',
    });

    const model1 = await fakeModelsRepository.create({
      name: 'Model Name Test',
      brand_id: brand1.id,
    });

    const model2 = await fakeModelsRepository.create({
      name: 'Model Name Test 2',
      brand_id: brand1.id,
    });

    await fakeModelsRepository.create({
      name: 'Model Name Test 3',
      brand_id: brand2.id,
    });

    const models = await retrieveModelsListByBrandIdService.execute({
      brand_id: brand1.id,
    });

    expect(models).toEqual([model1, model2]);
  });

  it('should be able to retrieve the list of models using the brand ID without the deleted ones', async () => {
    const brand = await fakeBrandsRepository.create({
      name: 'Brand Name Test',
    });

    const model1 = await fakeModelsRepository.create({
      name: 'Model Name Test',
      brand_id: brand.id,
    });

    const model2 = await fakeModelsRepository.create({
      name: 'Model Name Test 2',
      brand_id: brand.id,
    });

    await fakeModelsRepository.delete(model1.id);

    const models = await retrieveModelsListByBrandIdService.execute({
      brand_id: brand.id,
    });

    expect(models).toEqual([model2]);
  });

  it('should not able to retrieve the list of models using an invalid brand ID', async () => {
    await expect(
      retrieveModelsListByBrandIdService.execute({
        brand_id: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
