import AppError from '@shared/errors/AppError';

import FakeAdminsRepository from '../repositories/fakes/FakeAdminsRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateAdminService from './AuthenticateAdminService';

let fakeAdminsRepository: FakeAdminsRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateAdmin: AuthenticateAdminService;

describe('AuthenticateAdmin', () => {
  beforeEach(() => {
    fakeAdminsRepository = new FakeAdminsRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateAdmin = new AuthenticateAdminService(
      fakeAdminsRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const admin = await fakeAdminsRepository.create({
      name: 'Admin Name Test',
      email: 'admin@email.test',
      password: 'adminpassword',
    });

    const response = await authenticateAdmin.execute({
      email: 'admin@email.test',
      password: 'adminpassword',
    });

    expect(response).toHaveProperty('token');
    expect(response.admin).toEqual(admin);
  });

  it('should not be able to authenticate with non existing email', async () => {
    await expect(
      authenticateAdmin.execute({
        email: 'admin@email.test',
        password: 'adminpassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect email/password combination', async () => {
    await fakeAdminsRepository.create({
      name: 'Admin Name Test',
      email: 'admin@email.test',
      password: 'adminpassword',
    });

    await expect(
      authenticateAdmin.execute({
        email: 'admin@email.test',
        password: 'adminwrongpassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
