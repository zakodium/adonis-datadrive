import { randomUUID } from 'crypto';
import { extname } from 'path';

import type { DriverContract, DriveFileStats } from '@ioc:Adonis/Core/Drive';
import type {
  DataDriveContract,
  DataDriveFile,
  DataDriveFileWithSize,
  GraphqlUpload,
  PutOptions,
} from '@ioc:Zakodium/DataDrive';

const goodPrefix = /^[a-zA-Z0-9-]+$/;

export class DataDrive implements DataDriveContract {
  private prefix: string;
  private disk: DriverContract;

  public constructor(prefix: string, disk: DriverContract) {
    if (typeof prefix !== 'string') {
      throw new TypeError('prefix must be a string');
    }
    const split = prefix.split('/');
    if (split.length !== 2 || split[0] === '' || split[0] === '') {
      throw new TypeError('prefix must have two parts separated by a slash');
    }
    if (!goodPrefix.test(split[0]) || !goodPrefix.test(split[1])) {
      throw new Error(`bad prefix: ${prefix}. Must match ${goodPrefix.source}`);
    }
    this.prefix = prefix;
    this.disk = disk;
  }

  private _filePath(file: DataDriveFile): string {
    return `${this.prefix}/${file.id.substring(0, 2)}/${file.id.substring(
      2,
      4,
    )}/${file.id + extname(file.filename)}`;
  }

  public async copy(
    src: DataDriveFile,
    dest: string,
  ): Promise<DataDriveFileWithSize> {
    const id = randomUUID();
    const destPath = this._filePath({ id, filename: dest });
    await this.disk.copy(this._filePath(src), destPath);
    const { size } = await this.disk.getStats(destPath);
    return { id, filename: dest, size };
  }

  public async delete(file: DataDriveFile): Promise<void> {
    await this.disk.delete(this._filePath(file));
  }

  public async exists(file: DataDriveFile): Promise<boolean> {
    return this.disk.exists(this._filePath(file));
  }

  public async get(
    file: DataDriveFile,
    encoding?: BufferEncoding,
  ): Promise<string> {
    const result = await this.disk.get(this._filePath(file));
    return result.toString(encoding);
  }

  public async getBuffer(file: DataDriveFile): Promise<Buffer> {
    return this.disk.get(this._filePath(file));
  }

  public async getSignedUrl(
    file: DataDriveFile,
    options?: Parameters<DriverContract['getSignedUrl']>[1],
  ): Promise<string> {
    return this.disk.getSignedUrl(this._filePath(file), options);
  }

  public async getStats(file: DataDriveFile): Promise<DriveFileStats> {
    return this.disk.getStats(this._filePath(file));
  }

  public getStream(file: DataDriveFile): Promise<NodeJS.ReadableStream> {
    return this.disk.getStream(this._filePath(file));
  }

  public async put(
    filename: string,
    content: Buffer | string,
    options: PutOptions = {},
  ): Promise<DataDriveFileWithSize> {
    const { id = randomUUID() } = options;
    const destPath = this._filePath({ id, filename });
    await this.disk.put(destPath, content);
    const { size } = await this.disk.getStats(destPath);
    return {
      id,
      filename,
      size,
    };
  }

  public async putStream(
    filename: string,
    content: NodeJS.ReadableStream,
    options: PutOptions = {},
  ): Promise<DataDriveFileWithSize> {
    const { id = randomUUID() } = options;
    const destPath = this._filePath({ id, filename });
    await this.disk.putStream(destPath, content);
    const { size } = await this.disk.getStats(destPath);
    return {
      id,
      filename,
      size,
    };
  }

  public async storeGraphQLUpload(
    upload: Promise<GraphqlUpload>,
  ): Promise<DataDriveFileWithSize> {
    const pdf = await upload;
    const id = randomUUID();
    const { createReadStream, filename } = pdf;
    const destPath = this._filePath({ id, filename });
    await this.disk.putStream(destPath, createReadStream());
    const { size } = await this.disk.getStats(destPath);
    return {
      id,
      filename,
      size,
    };
  }
}
