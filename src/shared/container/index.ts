import { container } from 'tsyringe';

import '@modules/admins/providers';

import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import BrandsRepository from '@modules/brands/infra/typeorm/repositories/BrandsRepository';

import IModelsRepository from '@modules/models/repositories/IModelsRepository';
import ModelsRepository from '@modules/models/infra/typeorm/repositories/ModelsRepository';

import IVehiclesRepository from '@modules/vehicles/repositories/IVehiclesRepository';
import VehiclesRepository from '@modules/vehicles/infra/typeorm/repositories/VehiclesRepository';

import IAdminsRepository from '@modules/admins/repositories/IAdminsRepository';
import AdminsRepository from '@modules/admins/infra/typeorm/repositories/AdminsRepository';

container.registerSingleton<IBrandsRepository>(
  'BrandsRepository',
  BrandsRepository,
);

container.registerSingleton<IModelsRepository>(
  'ModelsRepository',
  ModelsRepository,
);

container.registerSingleton<IVehiclesRepository>(
  'VehiclesRepository',
  VehiclesRepository,
);

container.registerSingleton<IAdminsRepository>(
  'AdminsRepository',
  AdminsRepository,
);
