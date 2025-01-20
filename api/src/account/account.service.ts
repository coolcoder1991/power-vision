import { Injectable, Post } from '@nestjs/common';
import { Account } from './account.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(private dataSource: DataSource) {}
  private readonly accounts: Account[] = [];

  create(account: Account) {
    this.accounts.push(account);
  }

  findAll(): Account[] {
    return this.accounts;
  }

  async createMany(accounts: Account[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();
    const x = await queryRunner.query('select * from accounts');

    try {
      console.log('accounts[0]: ', accounts[0]);
      console.log('type of account: ', typeof accounts[0]);

      await queryRunner.query(
        ` INSERT INTO accounts(name, dt_updated, password) VALUES ('${accounts[0].name}','${accounts[0].password}') RETURNING id;`,
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      console.log('rolled back');
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}
