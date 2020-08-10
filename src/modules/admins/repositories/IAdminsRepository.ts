import Admin from '../infra/typeorm/entities/Admin';
import ICreateAdminDTO from '../dtos/ICreateAdminDTO';

export default interface IUsersRepository {
  findById(id: number): Promise<Admin | undefined>;
  findByEmail(email: string): Promise<Admin | undefined>;
  create(adminData: ICreateAdminDTO): Promise<Admin>;
}
