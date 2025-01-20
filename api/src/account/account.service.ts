import { Injectable, Post } from '@nestjs/common';
import { Account } from './account.interface';
import { DataSource } from 'typeorm';
import { query } from 'express';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AccountService {
  constructor(
    private dataSource: DataSource,
    private dbService: DbService,
  ) {}

  async find(account_name: string): Promise<Account> {
    const query = `select * from accounts where name='${account_name}' order by dt_updated desc limit 1`;
    return this.dbService.runQuery(query);
  }

  async createMany(accounts: Account[]) {
    await Promise.all(
      accounts.map((account) => {
        const res = this.dbService.runQuery(
          ` INSERT INTO accounts(name,  password) VALUES ('${account.name}','${account.password}') RETURNING id;`,
        );
      }),
    );
  }
}
