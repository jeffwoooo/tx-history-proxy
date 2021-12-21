import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  async getHealth() {
    return 'ok';
  }

  @Get(':account')
  getAccountTxHistory(
    @Param('account') account: string,
    @Query('offset') offset: string,
  ) {
    return this.appService.getAccountTxHistory(account, offset);
  }
}
