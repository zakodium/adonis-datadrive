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

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/adonis-datadrive.svg
[npm-url]: https://www.npmjs.com/package/adonis-datadrive
[ci-image]: https://github.com/zakodium/adonis-datadrive/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/zakodium/adonis-datadrive/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/adonis-datadrive.svg
[download-url]: https://www.npmjs.com/package/adonis-datadrive
