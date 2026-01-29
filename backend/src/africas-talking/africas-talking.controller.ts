import { Controller, Post, Body, Res } from '@nestjs/common';
import { AfricasTalkingService } from './africas-talking.service';
import type { Response } from 'express';

@Controller('africas-talking')
export class AfricasTalkingController {
  constructor(
    private readonly africasTalkingService: AfricasTalkingService,
  ) {}

  @Post('ussd')
  ussd(@Body() payload: any, @Res() res: Response) {
    const response = this.africasTalkingService.handleUssd(payload);
    res.set('Content-Type', 'text/plain');
    res.send(response);
  }
}