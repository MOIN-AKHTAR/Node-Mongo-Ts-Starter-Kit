import { NextFunction, Request } from 'express';
import { validationResult } from 'express-validator';
import { UserRequest, ValidationError } from '../types';

export const checkValidation = (req: Request) => {
  let errObj: { [key: string]: string } = {};

  const isError: any = validationResult(req);
  if (isError.errors.length > 0) {
    isError.errors.map((err: ValidationError) => {
      errObj[err.path] = err.msg;
    });
    return Object.keys(errObj).length ? errObj : null;
  } else return null;
};

export const validationWrapper = (callback: any): any => {
  return (
    req: Request | UserRequest,
    res: Response,
    next: NextFunction
  ): any => {
    let errors = checkValidation(req as any);
    if (errors) {
      return next({ message: errors, status: 400 });
    } else {
      callback(req as Request | UserRequest, res, next);
    }
  };
};
