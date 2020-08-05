import Model from '@modules/models/infra/typeorm/entities/Model';
import ICreateModelDTO from '@modules/models/dtos/ICreateModelDTO';
import IModelsRepository from '../IModelsRepository';

export default class ModelsRepository implements IModelsRepository {
  private models: Model[] = [];

  public async create({ name, brand_id }: ICreateModelDTO): Promise<Model> {
    const model = new Model();

    Object.assign(model, { id: this.models.length + 1, name, brand_id });

    this.models.push(model);

    return model;
  }

  public async findById(id: number): Promise<Model | undefined> {
    const findBrand = this.models.find(m => m.id === id);

    return findBrand;
  }

  public async findByName(name: string): Promise<Model | undefined> {
    const findBrand = this.models.find(m => m.name === name);

    return findBrand;
  }

  public async findAllByBrandId(id: number): Promise<Model[]> {
    return this.models.filter(m => !m.deleted_at && m.brand_id === id);
  }

  public async save(model: Model): Promise<Model> {
    const modelIndex = this.models.findIndex(m => m.id === model.id);

    this.models[modelIndex] = model;

    return model;
  }

  public async delete(id: number): Promise<void> {
    const brandIndex = this.models.findIndex(m => m.id === id);

    this.models[brandIndex].deleted_at = new Date();
  }
}
