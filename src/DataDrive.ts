import { extname } from 'path';

import { v4 as uuid } from '@lukeed/uuid';
import { Storage, SignedUrlOptions, StatResponse } from '@slynova/flydrive';

import {
  DataDriveFile,
  DataDriveFileWithSize,
  GraphqlUpload,
} from '@ioc:DataDrive';

const goodPrefix = /^[a-zA-Z0-9-]+$/;

export class DataDrive {
  private prefix: string;
  private disk: Storage;

  public constructor(prefix: string, disk: Storage) {
    if (typeof prefix !== 'string') {
      throw new TypeError('prefix must be a string');
    }
    const splitted = prefix.split('/');
    if (splitted.length !== 2 || splitted[0] === '' || splitted[0] === '') {
      throw new TypeError('prefix must have two parts separated by a slash');
    }
    if (!goodPrefix.test(splitted[0]) || !goodPrefix.test(splitted[1])) {
      throw new Error(`bad prefix: ${prefix}`);
    }
    this.prefix = prefix;
    this.disk = disk;
  }

  private _destPath(file: DataDriveFile): string {
    return `${this.prefix}/${file.id.substring(0, 2)}/${file.id.substring(
      2,
      4,
    )}/${file.id + extname(file.filename)}`;
  }

  public async copy(
    src: DataDriveFile,
    dest: string,
  ): Promise<DataDriveFileWithSize> {
    const id = uuid();
    const destPath = this._destPath({ id, filename: dest });
    await this.disk.copy(this._destPath(src), destPath);
    const { size } = await this.disk.getStat(destPath);
    return { id, filename: dest, size };
  }

  public async delete(file: DataDriveFile): Promise<void> {
    await this.disk.delete(this._destPath(file));
  }

  public async get(file: DataDriveFile, encoding?: string): Promise<string> {
    const result = await this.disk.get(this._destPath(file), encoding);
    return result.content;
  }

  public async getBuffer(file: DataDriveFile): Promise<Buffer> {
    const result = await this.disk.getBuffer(this._destPath(file));
    return result.content;
  }

  public async getSignedUrl(
    file: DataDriveFile,
    options?: SignedUrlOptions,
  ): Promise<string> {
    const result = await this.disk.getSignedUrl(this._destPath(file), options);
    return result.signedUrl;
  }

  public async getStat(file: DataDriveFile): Promise<StatResponse> {
    return this.disk.getStat(this._destPath(file));
  }

  public getStream(file: DataDriveFile): NodeJS.ReadableStream {
    return this.disk.getStream(this._destPath(file));
  }

  public async put(
    filename: string,
    content: Buffer | NodeJS.ReadableStream | string,
  ): Promise<DataDriveFileWithSize> {
    const id = uuid();
    const destPath = this._destPath({ id, filename });
    await this.disk.put(destPath, content);
    const { size } = await this.disk.getStat(destPath);
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
    const id = uuid();
    const { createReadStream, filename } = pdf;
    const destPath = this._destPath({ id, filename });
    await this.disk.put(destPath, createReadStream());
    const { size } = await this.disk.getStat(destPath);
    return {
      id,
      filename,
      size,
    };
  }
}
