import { IocContract } from '@adonisjs/fold';

import { DataDriveManager } from '../src/DataDriveManager';

export default class DataDriveProvider {
  private $container: IocContract;

  public constructor(container: IocContract) {
    this.$container = container;
  }

  public register(): void {
    this.$container.singleton('DataDrive', () => {
      const Drive = this.$container.use('Adonis/Addons/Drive');
      const config = this.$container.use('Adonis/Core/Config').get('datadrive');
      return new DataDriveManager(Drive, config);
    });
  }
}
