import { container } from 'tsyringe';

import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import BrandsRepository from '@modules/brands/infra/typeorm/repositories/BrandsRepository';

container.registerSingleton<IBrandsRepository>(
  'BrandsRepository',
  BrandsRepository,
);
