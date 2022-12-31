# condenseify

[![Version npm](https://img.shields.io/npm/v/condenseify.svg?style=flat-square)](https://www.npmjs.com/package/condenseify)[![Build Status](https://img.shields.io/github/workflow/status/primus/condenseify/CI/master?label=CI&style=flat-square)](https://github.com/primus/condenseify/actions?query=workflow%3ACI+branch%3Amaster)[![Coverage Status](https://img.shields.io/coveralls/primus/condenseify/master.svg?style=flat-square)](https://coveralls.io/r/primus/condenseify?branch=master)

This module for [Browserify](http://browserify.org/) will transform your js
files condensing multiple blank (empty) lines into a single blank line. By
default non empty lines containing only white spaces will be removed.

## Install

```
npm install --save condenseify
```

## Usage

### Command Line

```sh
browserify main.js -t condenseify > bundle.js
```

### API

Register the [transform](https://github.com/substack/node-browserify#btransformtr-opts).

```js
'use strict';

var condenseify = require('condenseify')
  , browserify = require('browserify')
  , fs = require('fs');

var b = browserify('main.js');
b.transform(condenseify);

b.bundle().pipe(fs.createWriteStream('bundle.js'));
```

### Options

If you want to keep the blank (non empty) lines you can use the `keep-non-empty`
option. Reusing the examples above, this translates into:

```sh
browserify main.js -t [ condenseify --keep-non-empty ] > bundle.js
```

for the command line and

```js
b.transform(condenseify, { 'keep-non-empty': true });
```

for the API.

## License

[MIT](LICENSE)
