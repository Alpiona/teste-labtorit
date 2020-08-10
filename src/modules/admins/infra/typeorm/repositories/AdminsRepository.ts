import { getRepository, Repository } from 'typeorm';

import IAdminsRepository from '@modules/admins/repositories/IAdminsRepository';
import ICreateAdminDTO from '@modules/admins/dtos/ICreateAdminDTO';

import Admin from '../entities/Admin';

class UsersRepository implements IAdminsRepository {
  private ormRepository: Repository<Admin>;

  constructor() {
    this.ormRepository = getRepository(Admin);
  }

  public async findById(id: number): Promise<Admin | undefined> {
    const admin = await this.ormRepository.findOne(id);

    return admin;
  }

  public async findByEmail(email: string): Promise<Admin | undefined> {
    const admin = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return admin;
  }

  public async create(adminData: ICreateAdminDTO): Promise<Admin> {
    const admin = this.ormRepository.create(adminData);

    await this.ormRepository.save(admin);

    return admin;
  }
}

export default UsersRepository;
