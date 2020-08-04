import ICreateBrandDTO from '../dtos/ICreateBrandDTO';
import Brand from '../infra/typeorm/entities/Brand';

export default interface IBrandsRepository {
  create(data: ICreateBrandDTO): Promise<Brand>;
  findById(id: number): Promise<Brand | undefined>;
  findByName(name: string): Promise<Brand | undefined>;
  findAll(): Promise<Brand[]>;
  save(brand: Brand): Promise<Brand>;
  delete(id: number): Promise<void>;
}
