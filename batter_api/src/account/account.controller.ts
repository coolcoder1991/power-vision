import { Body, Controller, Get, Post } from '@nestjs/common';
import { Account } from './account.interface';
import { AccountService } from './account.service';
import { CreateAccountDto } from './create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    this.accountService.create(createAccountDto);
    return 'New Account has been added';
  }
  @Post('/many')
  async createMany(@Body() createAccountDto: Account[]) {
    this.accountService.createMany(createAccountDto);
    return 'New Accounts has been added';
  }
  @Get()
  async findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }
}
