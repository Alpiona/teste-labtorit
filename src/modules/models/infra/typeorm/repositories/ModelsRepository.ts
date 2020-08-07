import { Repository, getRepository } from 'typeorm';

import IModelsRepository from '@modules/models/repositories/IModelsRepository';

import ICreateModelDTO from '@modules/models/dtos/ICreateModelDTO';
import Model from '../entities/Model';

export default class ModelsRepository implements IModelsRepository {
  private ormRepository: Repository<Model>;

  constructor() {
    this.ormRepository = getRepository(Model);
  }

  public async create({ name, brand_id }: ICreateModelDTO): Promise<Model> {
    const model = this.ormRepository.create({ name, brand_id });

    await this.ormRepository.save(model);

    return model;
  }

  public async findById(id: number): Promise<Model | undefined> {
    const model = await this.ormRepository.findOne(id);

    return model;
  }

  public async findByName(name: string): Promise<Model | undefined> {
    const model = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return model;
  }

  public async findAllByBrandId(brand_id: number): Promise<Model[]> {
    const models = await this.ormRepository.find({
      where: {
        brand_id,
      },
    });

    return models;
  }

  public async save(model: Model): Promise<Model> {
    return this.ormRepository.save(model);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}
