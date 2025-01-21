import { Controller, Get, Param, Post } from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device } from './device.interface';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get('/:id')
  find(@Param('id') device_id: number): Promise<Device> {
    return this.deviceService.find(device_id);
  }

  @Get()
  findAll(): Promise<Device[]> {
    return this.deviceService.findAll();
  }

  @Post()
  createNew(): Promise<Device> {
    return this.deviceService.create();
  }
}
