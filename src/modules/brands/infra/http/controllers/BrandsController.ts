import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateBrandService from '@modules/brands/services/CreateBrandService';
import RetrieveBrandsListService from '@modules/brands/services/RetrieveBrandsListService';
import RetrieveBrandByIdService from '@modules/brands/services/RetrieveBrandByIdService';
import UpdateBrandService from '@modules/brands/services/UpdateBrandService';
import DeleteBrandService from '@modules/brands/services/DeleteBrandService';

export default class BrandsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listBrands = container.resolve(RetrieveBrandsListService);

    const brands = await listBrands.execute();

    return response.json(classToClass(brands));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { brand_id } = request.params;

    const showBrand = container.resolve(RetrieveBrandByIdService);

    const brand = await showBrand.execute({ id: parseInt(brand_id, 10) });

    return response.json(classToClass(brand));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { brand_id } = request.params;
    const { name } = request.body;

    const updateBrand = container.resolve(UpdateBrandService);

    const brand = await updateBrand.execute({
      id: parseInt(brand_id, 10),
      name,
    });

    return response.json(classToClass(brand));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createBrand = container.resolve(CreateBrandService);

    const brand = await createBrand.execute({
      name,
    });

    return response.json(classToClass(brand));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { brand_id } = request.params;

    const deleteBrand = container.resolve(DeleteBrandService);

    await deleteBrand.execute({ id: parseInt(brand_id, 10) });

    return response.status(204).json();
  }
}
