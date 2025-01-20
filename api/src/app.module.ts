import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DbService } from './db/db.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'powervision',
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController, AccountController],
  providers: [AppService, AccountService, DbService],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
