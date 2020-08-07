import { container } from 'tsyringe';

import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import BrandsRepository from '@modules/brands/infra/typeorm/repositories/BrandsRepository';

import IModelsRepository from '@modules/models/repositories/IModelsRepository';
import ModelsRepository from '@modules/models/infra/typeorm/repositories/ModelsRepository';

container.registerSingleton<IBrandsRepository>(
  'BrandsRepository',
  BrandsRepository,
);

container.registerSingleton<IModelsRepository>(
  'ModelsRepository',
  ModelsRepository,
);
