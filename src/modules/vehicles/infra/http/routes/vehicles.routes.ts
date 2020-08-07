import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import VehiclesController from '../controllers/VehiclesController';

const vehiclesRouter = Router();
const vehiclesController = new VehiclesController();

vehiclesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      model_id: Joi.number().required(),
    },
  }),
  vehiclesController.index,
);

vehiclesRouter.get(
  '/:vehicle_id',
  celebrate({
    [Segments.PARAMS]: {
      vehicle_id: Joi.number().required(),
    },
  }),
  vehiclesController.show,
);

vehiclesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      fuel: Joi.string().required(),
      model_id: Joi.number().required(),
      value: Joi.number().required(),
      year_model: Joi.number().required(),
    },
  }),
  vehiclesController.create,
);

vehiclesRouter.put(
  '/:vehicle_id',
  celebrate({
    [Segments.PARAMS]: {
      vehicle_id: Joi.number().required(),
    },
    [Segments.BODY]: {
      fuel: Joi.string().required(),
      model_id: Joi.number().required(),
      value: Joi.number().required(),
      year_model: Joi.number().required(),
    },
  }),
  vehiclesController.update,
);

vehiclesRouter.delete(
  '/:vehicle_id',
  celebrate({
    [Segments.PARAMS]: {
      vehicle_id: Joi.number().required(),
    },
  }),
  vehiclesController.delete,
);

export default vehiclesRouter;
