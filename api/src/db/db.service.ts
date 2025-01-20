import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DbService {
  constructor(private dataSource: DataSource) {}
  async runQuery(queryText: string) {
    console.log('running ', queryText);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      const result = await queryRunner.query(queryText);

      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }
}
