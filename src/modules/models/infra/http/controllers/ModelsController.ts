import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateModelService from '@modules/models/services/CreateModelService';
import DeleteModelService from '@modules/models/services/DeleteModelService';
import RetrieveModelByIdService from '@modules/models/services/RetrieveModelByIdService';
import RetrieveModelsListByBrandIdService from '@modules/models/services/RetrieveModelsListByBrandIdService';
import UpdateModelService from '@modules/models/services/UpdateModelService';
import AppError from '@shared/errors/AppError';

export default class ModelsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { brand_id } = request.query;
    if (!brand_id) throw new AppError('Invalid brand_id!');

    const listModels = container.resolve(RetrieveModelsListByBrandIdService);

    const models = await listModels.execute({
      brand_id: parseInt(brand_id.toString(), 10),
    });

    return response.json(classToClass(models));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { model_id } = request.params;

    const showModel = container.resolve(RetrieveModelByIdService);

    const model = await showModel.execute({ id: parseInt(model_id, 10) });

    return response.json(model);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { model_id } = request.params;
    const { name, brand_id } = request.body;

    const updateModel = container.resolve(UpdateModelService);

    const model = await updateModel.execute({
      id: parseInt(model_id, 10),
      name,
      brand_id,
    });

    return response.json(classToClass(model));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, brand_id } = request.body;

    const createModel = container.resolve(CreateModelService);

    const model = await createModel.execute({
      name,
      brand_id,
    });

    return response.json(classToClass(model));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { model_id } = request.params;

    const deleteModel = container.resolve(DeleteModelService);

    await deleteModel.execute({ id: parseInt(model_id, 10) });

    return response.status(204).json();
  }
}
