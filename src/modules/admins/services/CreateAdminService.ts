import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IAdminsRepository from '../repositories/IAdminsRepository';
import Admin from '../infra/typeorm/entities/Admin';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateAdminService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<Admin> {
    const checkAdminExists = await this.adminsRepository.findByEmail(email);

    if (checkAdminExists) throw new AppError('Email address already used');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const admin = await this.adminsRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return admin;
  }
}

export default CreateAdminService;
