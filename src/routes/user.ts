import { Router } from 'express';
import { validationWrapper } from '../utils/helpers';
import { createUserValidation } from '../validations/userValidation';
import UserController from '../controllers/userController';
const userController = UserController();

const router = Router();

//Issuer Routes
router
  .route('/')
  .post(createUserValidation, validationWrapper(userController.createUser));

export default router;
