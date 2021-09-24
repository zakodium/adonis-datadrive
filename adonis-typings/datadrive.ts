declare module '@ioc:Zakodium/DataDrive' {
  import {
    DisksList,
    DriverContract,
    DriveFileStats,
  } from '@ioc:Adonis/Core/Drive';

  export interface GraphqlUpload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => NodeJS.ReadableStream;
  }

  export interface DataDriveConfig {
    drives: {
      [key: string]: {
        /**
         * Name of the disk from adonis-drive to use.
         */
        disk: keyof DisksList;
        /**
         * All files will be placed in a location under the `prefix`.
         * `prefix` must contain two parts separated by a slash.
         */
        prefix: `${string}/${string}`;
      };
    };
  }

  export interface DataDriveFile {
    id: string;
    filename: string;
  }

  export interface DataDriveFileWithSize extends DataDriveFile {
    size: number;
  }

  export interface PutOptions {
    id?: string;
  }

  export class DataDriveContract {
    copy(src: DataDriveFile, dest: string): Promise<DataDriveFileWithSize>;
    delete(file: DataDriveFile): Promise<void>;
    exists(file: DataDriveFile): Promise<boolean>;
    get(file: DataDriveFile, encoding?: BufferEncoding): Promise<string>;
    getBuffer(file: DataDriveFile): Promise<Buffer>;
    getSignedUrl(
      file: DataDriveFile,
      options?: Parameters<DriverContract['getSignedUrl']>[1],
    ): Promise<string>;
    getStats(file: DataDriveFile): Promise<DriveFileStats>;
    getStream(file: DataDriveFile): Promise<NodeJS.ReadableStream>;
    put(
      filename: string,
      content: Buffer | string,
      options?: PutOptions,
    ): Promise<DataDriveFileWithSize>;
    putStream(
      filename: string,
      content: NodeJS.ReadableStream,
      options?: PutOptions,
    ): Promise<DataDriveFileWithSize>;
    storeGraphQLUpload(
      upload: Promise<GraphqlUpload>,
    ): Promise<DataDriveFileWithSize>;
    moveFromMultipart(
      file: MultipartFileContract,
      filename: string,
      options?: PutOptions,
    ): Promise<DataDriveFileWithSize>;
  }

  export interface DataDriveManagerContract {
    use(name: string): DataDriveContract;
  }

  const dataDriveManager: DataDriveManagerContract;
  export default dataDriveManager;
}
