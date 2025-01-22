import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Device } from './device.interface';

@Injectable()
export class DeviceService {
  constructor(private dbService: DbService) {}

  async create() {
    const deviceQuery = `INSERT into device(name,  account_id) VALUES('new device',  1) RETURNING *`;

    const res = await this.dbService.runQuery(deviceQuery);
    const retreived_device: Device = res[0];
    const chargingQuery = `insert into charging(device_id)  VALUES(${retreived_device.id}) `;
    this.dbService.runQuery(chargingQuery);
    const batteryQuery = `insert into battery_status(device_id, battery_level, number_charges) VALUES( ${retreived_device.id}, 1, 0) `;
    this.dbService.runQuery(batteryQuery);

    return retreived_device;
  }

  async find(id: number): Promise<Device> {
    const query =
      `select a.name, a.model, b.last_charged, b.depletion_date, bat_stat.battery_level, bat_stat.number_charges ` +
      `from device as a left join charging as ` +
      `b on a.id = b.device_id join accounts as c on a.account_id = c.id ` +
      `join battery_status as bat_stat on a.id = bat_stat.device_id ` +
      `where a.account_id = 1 and a.id = ${id}`;

    const res = await this.dbService.runQuery(query);
    console.log('this is res: ', res);
    return res[0];
  }

  async findAll() {
    const query =
      'select a.name, a.model, b.last_charged, b.depletion_date ' +
      'from device as a left join charging as ' +
      'b on a.id = b.device_id join accounts as c on a.account_id = c.id where a.account_id = 1';
    const res = this.dbService.runQuery(query);
    return res;
  }

  async delete(id: number) {
    const batteryQuery = `delete from battery_status where device_id = ${id};`;
    const chargingQuery = `delete from charging where device_id = ${id};`;
    const deviceQuery = `delete from device where id = ${id} RETURNING *;`;
    await this.dbService.runQuery(batteryQuery);
    await this.dbService.runQuery(chargingQuery);
    const res = await this.dbService.runQuery(deviceQuery);
    return res[0];
  }
}
