import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAdminService from '@modules/admins/services/CreateAdminService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createAdmin = container.resolve(CreateAdminService);

    const admin = await createAdmin.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(admin));
  }
}
