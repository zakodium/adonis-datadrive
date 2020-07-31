import AdonisDrive from '@ioc:Adonis/Addons/Drive';

import { DataDriveConfig } from '@ioc:DataDrive';

import { DataDrive } from './DataDrive';

export class DataDriveManager {
  private $drives: Record<string, DataDrive>;

  public drive(name: string): DataDrive {
    if (this.$drives[name]) {
      return this.$drives[name];
    } else {
      throw new Error(`unknown drive: ${name}`);
    }
  }

  public constructor(Drive: typeof AdonisDrive, config: DataDriveConfig) {
    this.$drives = {};
    for (const name in config.drives) {
      const conf = config.drives[name];
      this.$drives[name] = new DataDrive(conf.prefix, Drive.disk(conf.disk));
    }
  }
}
