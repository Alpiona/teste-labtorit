import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IAdminsRepository from '../repositories/IAdminsRepository';
import Admin from '../infra/typeorm/entities/Admin';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  admin: Admin;
  token: string;
}
@injectable()
export default class AuthenticateAdminService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const admin = await this.adminsRepository.findByEmail(email);

    if (!admin) throw new AppError('Incorrect email/password combination', 401);

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      admin.password,
    );

    if (!passwordMatched)
      throw new AppError('Incorrect email/password combination', 401);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: admin.id.toString(),
      expiresIn,
    });

    return {
      admin,
      token,
    };
  }
}
