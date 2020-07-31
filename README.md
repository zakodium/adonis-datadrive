# adonis-datadrive

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![npm download][download-image]][download-url]

Extended drive provider for AdonisJs.

## Installation

```console
npm i adonis-datadrive
node ace invoke adonis-datadrive
```

## Usage

```js
import DataDrive from '@ioc:DataDrive';

const drive = DataDrive.drive('myDrive');

// drive.put('myfile.txt', 'mycontent').then(...);
```

## Examples

### Upload file

```js
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

// Library importation
import DataDrive from '@ioc:DataDrive';

export default class FilesController {
  public async upload({ request, params }: HttpContextContract) {
    const { filename } = params;
    request.multipart.onFile(filename, {}, async (file) => {
      // Saves the file
      await DataDrive.drive('dir').put(filename, file);
    });
    await request.multipart.process();
    return `${filename} uploaded`;
  }
}
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/adonis-datadrive.svg
[npm-url]: https://www.npmjs.com/package/adonis-datadrive
[ci-image]: https://github.com/zakodium/adonis-datadrive/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/zakodium/adonis-datadrive/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/adonis-datadrive.svg
[download-url]: https://www.npmjs.com/package/adonis-datadrive
