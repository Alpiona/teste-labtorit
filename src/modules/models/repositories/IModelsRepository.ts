import Model from '../infra/typeorm/entities/Model';
import ICreateModelDTO from '../dtos/ICreateModelDTO';

export default interface IModelsRepository {
  create(data: ICreateModelDTO): Promise<Model>;
  findById(id: number): Promise<Model | undefined>;
  findByName(name: string): Promise<Model | undefined>;
  findAllByBrandId(brand_id: number): Promise<Model[]>;
  save(model: Model): Promise<Model>;
  delete(id: number): Promise<void>;
}
