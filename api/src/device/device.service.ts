import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Device } from './device.interface';

@Injectable()
export class DeviceService {
  constructor(private dbService: DbService) {}

  async create() {
    const deviceQuery = `INSERT into device(name,  account_id) VALUES('new device',  1)`;
    const chargingQuery =
      'with f as (select id  from device order by dt_updated desc limit 1) ' +
      'insert into charging(device_id) SELECT f.id from f ';
    this.dbService.runQuery(deviceQuery);
    this.dbService.runQuery(chargingQuery);
    const newDevice: Device = {
      name: 'new device',
      account_id: 1,
    };
    return newDevice;
  }

  async findAll() {
    const query =
      'select a.name, a.model, b.last_charged, b.depletion_date ' +
      'from device as a join charging as ' +
      'b on a.id = b.device_id join accounts as c on a.account_id = c.id where a.account_id = 1';
    const res = this.dbService.runQuery(query);
    return res;
  }
}
