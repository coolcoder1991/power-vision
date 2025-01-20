import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Account } from './account.interface';
import { AccountService } from './account.service';
import { CreateAccountDto } from './create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('/many')
  async createMany(@Body() createAccountDto: Account[]) {
    this.accountService.createMany(createAccountDto);
    return 'New Accounts has been added';
  }
  @Get('/:name')
  async find(@Param('name') account_name: string): Promise<Account> {
    return this.accountService.find(account_name);
  }
}
