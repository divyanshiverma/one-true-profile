import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import * as utils from '../utils/utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('requestotp')
  async requestOTP(@Req() req: Request, @Res() res: Response) {
    const email = req.body.email!
    if(!utils.validateEmail(email)) {
      return res.status(400).send('Login failed');
    }
    await this.authService.sendOTP(email)
    return res.status(201).send({});
  }

  @Post('login')
  login() {

  }
}
