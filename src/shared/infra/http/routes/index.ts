import { Router } from 'express';

import brandsRouter from '@modules/brands/infra/http/routes/brands.routes';
import modelsRouter from '@modules/models/infra/http/routes/models.routes';
import vehiclesRouter from '@modules/vehicles/infra/http/routes/vehicles.routes';

const routes = Router();

routes.use('/api/brands', brandsRouter);
routes.use('/api/models', modelsRouter);
routes.use('/api/vehicles', vehiclesRouter);

export default routes;
