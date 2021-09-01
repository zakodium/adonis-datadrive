declare module '@ioc:Adonis/Core/Application' {
  import type { DataDriveManagerContract } from '@ioc:Zakodium/DataDrive';

  export interface ContainerBindings {
    'Zakodium/DataDrive': DataDriveManagerContract;
  }
}
