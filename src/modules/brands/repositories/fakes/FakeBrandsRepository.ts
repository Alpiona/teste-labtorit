import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import ICreateBrandDTO from '@modules/brands/dtos/ICreateBrandDTO';

import Brand from '@modules/brands/infra/typeorm/entities/Brand';

export default class BrandsRepository implements IBrandsRepository {
  private brands: Brand[] = [];

  public async create({ name }: ICreateBrandDTO): Promise<Brand> {
    const brand = new Brand();

    Object.assign(brand, { id: this.brands.length + 1, name });

    this.brands.push(brand);

    return brand;
  }

  public async findById(id: number): Promise<Brand | undefined> {
    const findBrand = this.brands.find(b => b.id === id);

    return findBrand;
  }

  public async findByName(name: string): Promise<Brand | undefined> {
    const findBrand = this.brands.find(b => b.name === name);

    return findBrand;
  }

  public async findAll(): Promise<Brand[]> {
    return this.brands.filter(b => !b.deleted_at);
  }

  public async save(brand: Brand): Promise<Brand> {
    const brandIndex = this.brands.findIndex(b => b.id === brand.id);

    this.brands[brandIndex] = brand;

    return brand;
  }

  public async delete(id: number): Promise<void> {
    const brandIndex = this.brands.findIndex(b => b.id === id);

    this.brands[brandIndex].deleted_at = new Date();
  }
}
