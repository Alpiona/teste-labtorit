import { uuid } from 'uuidv4';

import IAdminsRepository from '@modules/admins/repositories/IAdminsRepository';
import ICreateAdminDTO from '@modules/admins/dtos/ICreateAdminDTO';

import Admin from '../../infra/typeorm/entities/Admin';

export default class FakeAdminsRepository implements IAdminsRepository {
  private admins: Admin[] = [];

  public async findById(id: number): Promise<Admin | undefined> {
    const findAdmin = this.admins.find(admin => admin.id === id);
    return findAdmin;
  }

  public async findByEmail(email: string): Promise<Admin | undefined> {
    const findAdmin = this.admins.find(admin => admin.email === email);
    return findAdmin;
  }

  public async create(adminData: ICreateAdminDTO): Promise<Admin> {
    const admin = new Admin();

    Object.assign(admin, { id: uuid() }, adminData);

    this.admins.push(admin);

    return admin;
  }
}
