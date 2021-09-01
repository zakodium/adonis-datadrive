# Adonis DataDrive

Extended drive provider for AdonisJS 5.

<h3 align="center">

  <a href="https://www.zakodium.com">
    <img src="https://www.zakodium.com/brand/zakodium-logo-white.svg" width="50" alt="Zakodium logo" />
  </a>

  <p>
    Maintained by <a href="https://www.zakodium.com">Zakodium</a>
  </p>

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![npm download][download-image]][download-url]

| :warning: This module is unstable and in active development. Use at your own risk. |
| ---------------------------------------------------------------------------------- |

</h3>

## Installation

```console
npm i adonis-datadrive
node ace configure adonis-datadrive
```

## Usage

```js
import DataDrive from '@ioc:Zakodium/DataDrive';

const drive = DataDrive.use('myDrive');

// drive.put('myfile.txt', 'mycontent').then(...);
```

## Examples

### Upload file

```js
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

// Library importation
import DataDrive from '@ioc:Zakodium/DataDrive';

export default class FilesController {
  public async upload({ request, params }: HttpContextContract) {
    const { filename } = params;
    request.multipart.onFile(filename, {}, async (file) => {
      // Saves the file
      await DataDrive.use('dir').put(filename, file);
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
[ci-image]: https://github.com/zakodium/adonis-datadrive/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/zakodium/adonis-datadrive/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/adonis-datadrive.svg
[download-url]: https://www.npmjs.com/package/adonis-datadrive
