declare module '@ioc:DataDrive' {
  import { Readable } from 'stream';

  import {
    Storage,
    Response,
    ContentResponse,
    SignedUrlOptions,
    SignedUrlResponse,
    StatResponse,
  } from '@slynova/flydrive';

  import Drive from '@ioc:Drive';

  export interface GraphqlUpload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Readable;
  }

  export interface DataDriveConfig {
    drives: {
      [key: string]: {
        /**
         * Name of the disk from adonis-drive to use.
         */
        disk: string;
        /**
         * All files will be placed in a location under the `prefix`.
         * `prefix` must contain two parts separated by a slash.
         */
        prefix: string;
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

  export class DataDrive {
    public copy(
      src: DataDriveFile,
      dest: string,
    ): Promise<DataDriveFileWithSize>;
    public delete(file: DataDriveFile): Promise<void>;
    public get(file: DataDriveFile, encoding?: string): Promise<string>;
    public getBuffer(file: DataDriveFile): Promise<Buffer>;
    public getSignedUrl(
      file: DataDriveFile,
      options?: SignedUrlOptions,
    ): Promise<string>;
    public getStat(file: DataDriveFile): Promise<StatResponse>;
    public getStream(file: DataDriveFile): Readable;
    public put(
      filename: string,
      content: Buffer | Readable | string,
    ): Promise<DataDriveFileWithSize>;
    public storeGraphQLUpload(
      upload: Promise<GraphqlUpload>,
    ): Promise<DataDriveFileWithSize>;
  }

  class DataDriveManager {
    public drive(name: string): DataDrive;
  }

  const dataDriveManager: DataDriveManager;
  export default dataDriveManager;
}
