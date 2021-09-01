import type AdonisDrive from '@ioc:Adonis/Core/Drive';
import type {
  DataDriveConfig,
  DataDriveManagerContract,
} from '@ioc:Zakodium/DataDrive';

import { DataDrive } from './DataDrive';

export class DataDriveManager implements DataDriveManagerContract {
  private $drives: Record<string, DataDrive>;

  public use(name: string): DataDrive {
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
      this.$drives[name] = new DataDrive(conf.prefix, Drive.use(conf.disk));
    }
  }
}
