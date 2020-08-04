import AppError from '@shared/errors/AppError';

import FakeBrandsRepository from '../repositories/fakes/FakeBrandsRepository';
import CreateBrandService from './CreateBrandService';

let fakeBrandsRepository: FakeBrandsRepository;
let createBrandService: CreateBrandService;

describe('CreateBrand', () => {
  beforeEach(() => {
    fakeBrandsRepository = new FakeBrandsRepository();

    createBrandService = new CreateBrandService(fakeBrandsRepository);
  });

  it('should be able to create a new brand', async () => {
    const brand = await createBrandService.execute({
      name: 'Brand Name Test',
    });

    expect(brand).toHaveProperty('id');
  });

  it('should not be able to create a new brand with same name', async () => {
    await fakeBrandsRepository.create({
      name: 'Brand Name Test',
    });

    expect(
      createBrandService.execute({
        name: 'Brand Name Test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
