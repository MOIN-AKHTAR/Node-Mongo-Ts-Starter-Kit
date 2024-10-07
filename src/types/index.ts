import { Request, Router } from 'express';

interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password?: string;
  firstName: string;
  lastName: string | null | undefined;
  role: string;
  onBoardLink?: string | null;
  avatarUrl?: string | null;
  phoneNo?: string | null;
  isActive: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  businessId: string;
}

export interface UserRequest extends Request {
  user: IUser | null | any;
}

export interface IjwtPayLoad {
  id?: string;
}

export interface Routes {
  path?: string;
  router: Router;
}

export interface ValidationError {
  type: string;
  value: string | number;
  msg: string;
  path: string;
  location: string;
}

// export interface IRequestHandler {
//   (req: Request | UserRequest, res: Response, next: NextFunction): Promise<any>;
// }
