import FakeBrandsRepository from '../repositories/fakes/FakeBrandsRepository';
import RetrieveBrandsListService from './RetrieveBrandsListService';

let fakeBrandsRepository: FakeBrandsRepository;
let retrieveBrandsListService: RetrieveBrandsListService;

describe('RetrieveBrandsList', () => {
  beforeEach(() => {
    fakeBrandsRepository = new FakeBrandsRepository();

    retrieveBrandsListService = new RetrieveBrandsListService(
      fakeBrandsRepository,
    );
  });

  it('should be able to retrieve the list of brands', async () => {
    const brand1 = await fakeBrandsRepository.create({
      name: 'Brand Name Test',
    });

    const brand2 = await fakeBrandsRepository.create({
      name: 'Brand Name Test 2',
    });

    const brands = await retrieveBrandsListService.execute();

    expect(brands).toEqual([brand1, brand2]);
  });

  it('should be able to retrieve the list of brands without the deleted brands', async () => {
    const brand1 = await fakeBrandsRepository.create({
      name: 'Brand Name Test',
    });

    const brand2 = await fakeBrandsRepository.create({
      name: 'Brand Name Test 2',
    });

    await fakeBrandsRepository.delete(brand1.id);

    const brands = await retrieveBrandsListService.execute();

    expect(brands).toEqual([brand2]);
  });
});
