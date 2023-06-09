import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from './user.service';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  async viewProfile(@Req() req: Request, @Res() res: Response) {
    const userId = res.locals.userId;
    const user = await this.userService.getById(userId)
    return res.status(200).send(user);
  }

  @Patch('profile')
  @UseGuards(AuthGuard)
  async editProfile(@Req() req: Request, @Res() res: Response) {
    const userId = res.locals.userId;
    const data = req.body;
    const user = await this.userService.getByIdAndUpdate(userId, data)
    return res.status(201).send(user);
  }
}
