import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import { jwtPrivateKey } from '../config/config';
import { JWT_ACCESS_TOKEN } from '../utils/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();
    const token = req.header(JWT_ACCESS_TOKEN);
    if (!token) return false;
    try {
      const decoded: any = jwt.verify(token, jwtPrivateKey);
      res.locals.userId = decoded['userId'];
      return true;
    } catch (error) {
      return false;
    }
  }
}
