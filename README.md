# secrets-manager 
[![CircleCI](https://circleci.com/gh/starlogik/secrets-manager.svg?style=svg)](https://circleci.com/gh/starlogik/secrets-manager)

A NodeJS config file decryptor for AWS Secrets Manager.

All contributions are welcome.

## Simple API

#### decrypt(filePath, pattern)

* `filePath` String. Absolute path to a JSON config file.
* `pattern` RexExp. The pattern to match key values to AWS Secret names. Defaults to any string with `secret:` prefix.

Asynchronous. Returns a Promise that resolves the config file with decrypted values.

#### decryptSync(filePath, pattern)

* `filePath` String. Absolute path to a JSON config file.
* `pattern` RexExp. The pattern to match key values to AWS Secret names. Defaults to any string with `secret:` prefix.

Synchronous. Returns a config file with decrypted values.

## Async Example Usage

``` js

const { decrypt } = require('secrets-manager');
decrypt(path.join(process.cwd(), 'config.json')).then(function (config) {
  console.log('Decrypted config', config);
}).catch(function (err) {
  console.error('Error', err);
});

```

## Sync Example Usage

``` js

const { decryptSync } = require('secrets-manager');

try {
  const config = decryptSync(path.join(process.cwd(), 'config.json'));
  console.log('Decrypted config', config);
}
catch (err) {
  console.error('Error', err);
}

```

## Installation

```
npm install secrets-manager
```

## License

(The MIT License)

Copyright (c) Starlogik &lt;info@starlogik.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.