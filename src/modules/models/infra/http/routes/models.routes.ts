import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/admins/infra/http/middlewares/ensureAuthenticated';
import ModelsController from '../controllers/ModelsController';

const modelsRouter = Router();
const modelsController = new ModelsController();

modelsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      brand_id: Joi.number().required(),
    },
  }),
  modelsController.index,
);

modelsRouter.get(
  '/:model_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      model_id: Joi.number().required(),
    },
  }),
  modelsController.show,
);

modelsRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      brand_id: Joi.number().required(),
    },
  }),
  modelsController.create,
);

modelsRouter.put(
  '/:model_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      model_id: Joi.number().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      brand_id: Joi.number().required(),
    },
  }),
  modelsController.update,
);

modelsRouter.delete(
  '/:model_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      model_id: Joi.number().required(),
    },
  }),
  modelsController.delete,
);

export default modelsRouter;
