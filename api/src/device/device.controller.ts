import { Controller, Get, Post } from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device } from './device.interface';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get()
  find(): Promise<Device[]> {
    return this.deviceService.findAll();
  }

  @Post()
  createNew(): Promise<Device> {
    return this.deviceService.create();
  }
}
