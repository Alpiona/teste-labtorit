import AppError from '@shared/errors/AppError';

import FakeBrandsRepository from '../repositories/fakes/FakeBrandsRepository';
import UpdateBrandService from './UpdateBrandService';

let fakeBrandsRepository: FakeBrandsRepository;
let updateBrandService: UpdateBrandService;

describe('UpdateBrandById', () => {
  beforeEach(() => {
    fakeBrandsRepository = new FakeBrandsRepository();

    updateBrandService = new UpdateBrandService(fakeBrandsRepository);
  });

  it('should be able to update the brand using the ID', async () => {
    const createdBrand = await fakeBrandsRepository.create({
      name: 'Brand Name Test',
    });

    await updateBrandService.execute({
      id: createdBrand.id,
      name: 'Brand Name Test 2',
    });

    const brand = await fakeBrandsRepository.findById(createdBrand.id);

    expect(brand?.name).toBe('Brand Name Test 2');
  });

  it('should not be able to update a brand with invalid ID', async () => {
    await expect(
      updateBrandService.execute({
        id: 123,
        name: 'Brand Name Test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
