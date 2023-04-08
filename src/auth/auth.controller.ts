import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { Request, Response } from 'express';
import * as utils from '../utils/utils';
import { jwtPrivateKey } from 'src/config/config';
const jwt =  require('jsonwebtoken');

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    ) {}
    
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
    async login(@Req() req: Request, @Res() res: Response) {
      const email = req.body.email!
      const otp = req.body.otp!
      
      const valid = await this.authService.verifyOTP(email, otp)
      if(!valid) {
        return res.status(400).send('Login failed');
      }
      
      const user = await this.userService.getOrCreateUser(email)
      
      // Generate and return token
      const tokenData = { userId: user._id }
      const tokenSecret = jwtPrivateKey;
      const tokenExpiry = {expiresIn: 60 * 60 * 24 * 30}; // 1 month
      res.send({
        user: user,
        token: jwt.sign(tokenData, tokenSecret, tokenExpiry),
      });
  }
}
