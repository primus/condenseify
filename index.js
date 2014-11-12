'use strict';

var through = require('through2')
  , pumpify = require('pumpify')
  , split = require('split');

//
// Expose the transform.
//
module.exports = condenseify;

/**
 * Browserify transform to condense multiple blank lines
 * into a single blank line.
 *
 * @param {String} file File name
 * @param {Object} [options] Options object
 * @returns {Stream} Transform stream
 * @api public
 */
function condenseify(file, options) {
  if (/\.json$/.test(file)) return through();

  var eol = new Buffer('\n')
    , appendNewLine = true
    , regex = /^[ \t]+$/
    , isBlank = false;

  options = options || {};

  function transform(line, encoding, next) {
    /* jshint validthis: true */
    var length = line.length;

    if (!length) {
      isBlank = true;
      return next();
    }

    if (!options['keep-non-empty'] && regex.test(line)) return next();

    if (isBlank) {
      isBlank = false;
      this.push(eol);
    }
    appendNewLine = false;
    this.push(Buffer.concat([ line, eol ], ++length));
    next();
  }

  function flush(done) {
    /* jshint validthis: true */
    if (appendNewLine) this.push(eol);
    done();
  }

  return pumpify(split(), through(transform, flush));
}
