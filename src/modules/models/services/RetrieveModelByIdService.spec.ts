import AppError from '@shared/errors/AppError';

import FakeModelsRepository from '../repositories/fakes/FakeModelsRepository';
import RetrieveModelByIdService from './RetrieveModelByIdService';

let fakeModelsRepository: FakeModelsRepository;
let retrieveModelByIdService: RetrieveModelByIdService;

describe('RetrieveModelById', () => {
  beforeEach(() => {
    fakeModelsRepository = new FakeModelsRepository();

    retrieveModelByIdService = new RetrieveModelByIdService(
      fakeModelsRepository,
    );
  });

  it('should be able to retrieve the brand using the ID', async () => {
    const newModel = await fakeModelsRepository.create({
      name: 'Model Name Test',
      brand_id: 1,
    });

    const model = await retrieveModelByIdService.execute({
      id: newModel.id,
    });

    expect(model.name).toBe('Model Name Test');
  });

  it('should not be able to retrieve a brand with invalid ID', async () => {
    await expect(
      retrieveModelByIdService.execute({
        id: 123,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
