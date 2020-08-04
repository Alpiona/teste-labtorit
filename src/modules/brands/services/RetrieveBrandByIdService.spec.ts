import AppError from '@shared/errors/AppError';

import FakeBrandsRepository from '../repositories/fakes/FakeBrandsRepository';
import RetrieveBrandByIdService from './RetrieveBrandByIdService';

let fakeBrandsRepository: FakeBrandsRepository;
let retrieveBrandByIdService: RetrieveBrandByIdService;

describe('RetrieveBrandById', () => {
  beforeEach(() => {
    fakeBrandsRepository = new FakeBrandsRepository();

    retrieveBrandByIdService = new RetrieveBrandByIdService(
      fakeBrandsRepository,
    );
  });

  it('should be able to retrieve the brand using the ID', async () => {
    const createdBrand = await fakeBrandsRepository.create({
      name: 'Brand Name Test',
    });

    const brand = await retrieveBrandByIdService.execute({
      id: createdBrand.id,
    });

    expect(brand.name).toBe('Brand Name Test');
  });

  it('should not be able to retrieve a brand with invalid ID', async () => {
    await expect(
      retrieveBrandByIdService.execute({
        id: 123,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
