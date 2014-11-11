'use strict';

var through = require('through2')
  , pumpify = require('pumpify')
  , split = require('split')
  , regex = /^[ \t]+$/;

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

  var appendNewLine = true
    , isBlank = false;

  options = options || {};

  function transform(line, encoding, next) {
    /* jshint validthis: true */
    if (!line.length) {
      isBlank = true;
      return next();
    }

    line = line.toString();
    if (!options['keep-non-empty'] && regex.test(line)) return next();

    if (isBlank) {
      isBlank = false;
      this.push('\n');
    }
    appendNewLine = false;
    this.push(line +'\n');
    next();
  }

  function flush(done) {
    /* jshint validthis: true */
    if (appendNewLine) this.push('\n');
    done();
  }

  return pumpify(split(), through(transform, flush));
}
