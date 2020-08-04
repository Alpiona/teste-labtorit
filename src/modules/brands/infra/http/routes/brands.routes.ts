import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import BrandsController from '../controllers/BrandsController';

const brandsRouter = Router();
const brandsController = new BrandsController();

brandsRouter.get('/', brandsController.index);

brandsRouter.get(
  '/:brand_id',
  celebrate({
    [Segments.PARAMS]: {
      brand_id: Joi.number().required(),
    },
  }),
  brandsController.show,
);

brandsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  brandsController.create,
);

brandsRouter.put(
  '/:brand_id',
  celebrate({
    [Segments.PARAMS]: {
      brand_id: Joi.number().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  brandsController.update,
);

brandsRouter.delete(
  '/:brand_id',
  celebrate({
    [Segments.PARAMS]: {
      brand_id: Joi.number().required(),
    },
  }),
  brandsController.delete,
);

export default brandsRouter;
