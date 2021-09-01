import type { ApplicationContract } from '@ioc:Adonis/Core/Application';

import { DataDriveManager } from '../src/DataDriveManager';

export default class DataDriveProvider {
  public constructor(private app: ApplicationContract) {}

  public register(): void {
    this.app.container.singleton('Zakodium/DataDrive', () => {
      const Drive = this.app.container.resolveBinding('Adonis/Core/Drive');
      const config = this.app.config.get('datadrive');
      return new DataDriveManager(Drive, config);
    });
  }
}
