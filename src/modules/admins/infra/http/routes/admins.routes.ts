import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AdminsController from '../controllers/AdminsController';

const adminsRouter = Router();
const adminsController = new AdminsController();

adminsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      is_admin: Joi.boolean(),
    },
  }),
  adminsController.create,
);

export default adminsRouter;
