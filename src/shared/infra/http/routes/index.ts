import { Router } from 'express';

import brandsRouter from '@modules/brands/infra/http/routes/brands.routes';

const routes = Router();

routes.use('/api/brands', brandsRouter);

export default routes;
