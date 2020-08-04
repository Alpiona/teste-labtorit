import AppError from '@shared/errors/AppError';

import FakeBrandsRepository from '../repositories/fakes/FakeBrandsRepository';
import DeleteBrandService from './DeleteBrandService';

let fakeBrandsRepository: FakeBrandsRepository;
let deleteBrandService: DeleteBrandService;

describe('DeleteBrand', () => {
  beforeEach(() => {
    fakeBrandsRepository = new FakeBrandsRepository();

    deleteBrandService = new DeleteBrandService(fakeBrandsRepository);
  });

  it('should be able to delete the brand using the ID', async () => {
    const createdBrand = await fakeBrandsRepository.create({
      name: 'Brand Name Test',
    });

    await deleteBrandService.execute({
      id: createdBrand.id,
    });

    const brand = await fakeBrandsRepository.findById(createdBrand.id);

    expect(brand).toHaveProperty('deleted_at');
  });

  it('should not be able to delete a brand with invalid ID', async () => {
    await expect(
      deleteBrandService.execute({
        id: 123,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
