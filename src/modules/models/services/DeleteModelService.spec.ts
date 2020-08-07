import AppError from '@shared/errors/AppError';

import FakeModelsRepository from '../repositories/fakes/FakeModelsRepository';
import DeleteModelService from './DeleteModelService';

let fakeModelsRepository: FakeModelsRepository;
let deleteModelService: DeleteModelService;

describe('DeleteModelById', () => {
  beforeEach(() => {
    fakeModelsRepository = new FakeModelsRepository();

    deleteModelService = new DeleteModelService(fakeModelsRepository);
  });

  it('should be able to delete the model using the ID', async () => {
    const newModel = await fakeModelsRepository.create({
      name: 'Model Name Test',
      brand_id: 1,
    });

    await deleteModelService.execute({
      id: newModel.id,
    });

    const model = await fakeModelsRepository.findById(newModel.id);

    expect(model).toBeUndefined();
  });

  it('should not be able to delete a model with invalid ID', async () => {
    await expect(
      deleteModelService.execute({
        id: 123,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
