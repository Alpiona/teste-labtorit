import AppError from '@shared/errors/AppError';

import FakeAdminsRepository from '../repositories/fakes/FakeAdminsRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateAdminService from './CreateAdminService';

let fakeAdminsRepository: FakeAdminsRepository;
let fakeHashProvider: FakeHashProvider;

let createAdmin: CreateAdminService;

describe('CreateAdmin', () => {
  beforeEach(() => {
    fakeAdminsRepository = new FakeAdminsRepository();
    fakeHashProvider = new FakeHashProvider();

    createAdmin = new CreateAdminService(
      fakeAdminsRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new admin', async () => {
    const admin = await createAdmin.execute({
      name: 'Admin Name Test',
      email: 'admin@email.test',
      password: 'adminpassword',
    });

    expect(admin).toHaveProperty('id');
  });

  it('should not be able to create a new admin with same email', async () => {
    await createAdmin.execute({
      name: 'Admin Name Test',
      email: 'admin@email.test',
      password: 'adminpassword',
    });

    expect(
      createAdmin.execute({
        name: 'Admin Name Test2',
        email: 'admin@email.test',
        password: 'adminpassword2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
