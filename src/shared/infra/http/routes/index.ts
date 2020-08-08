import { Router } from 'express';

import brandsRouter from '@modules/brands/infra/http/routes/brands.routes';
import modelsRouter from '@modules/models/infra/http/routes/models.routes';
import vehiclesRouter from '@modules/vehicles/infra/http/routes/vehicles.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/api/brands', brandsRouter);
routes.use('/api/models', modelsRouter);
routes.use('/api/vehicles', vehiclesRouter);
routes.use('/api/users', usersRouter);
routes.use('/api/sessions', sessionsRouter);

export default routes;
