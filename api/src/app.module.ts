import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DbService } from './db/db.service';
import { DeviceController } from './device/device.controller';
import { DeviceService } from './device/device.service';

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
  controllers: [AppController, AccountController, DeviceController],
  providers: [AppService, AccountService, DbService, DeviceService],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
