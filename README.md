# condenseify

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

MIT
