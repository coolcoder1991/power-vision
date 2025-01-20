import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'batter',
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController, AccountController],
  providers: [AppService, AccountService],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
