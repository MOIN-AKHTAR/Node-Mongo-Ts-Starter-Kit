import { Request, Response } from 'express';
import { ModelFunctions } from '../models';
import UserModel from '../models/user';
import logger from '../utils/logger';
import { sendErrorResponse, sendSuccessResponse } from '../utils/response';

const UserController = () => {
  const userModel = ModelFunctions(UserModel);

  const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
      logHttp('Adding User With reqBody ==> ', req.body);

      const newUser = await userModel.create(req.body);

      log('New User Created ==> ', newUser);
      return sendSuccessResponse({
        res,
        data: newUser,
      });
    } catch (error: any) {
      logError(`Error While Creating User ==> `, error?.message);
      return sendErrorResponse({
        req,
        res,
        statusCode: error?.statusCode || 400,
        error,
      });
    }
  };

  const log = (context: string, value?: any) =>
    logger.info(`User - ${context} => ${JSON.stringify(value)}`);

  const logHttp = (context: string, value?: any) =>
    logger.http(`User - ${context} => ${JSON.stringify(value)}`);

  const logError = (context: string, value?: any) =>
    logger.error(`User - ${context} => ${JSON.stringify(value)}`);

  return {
    createUser,
  };
};

export default UserController;
