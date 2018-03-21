'use strict';

var through = require('through2')
  , pumpify = require('pumpify')
  , split = require('split2');

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
    , regex = /^[ \t]+$/
    , isBlank = false
    , eol ='\n';

  options = options || {};

  function transform(line, encoding, next) {
    if (!line.length) {
      isBlank = true;
      return next();
    }

    line = line.toString();
    if (!options['keep-non-empty'] && regex.test(line)) return next();

    if (isBlank) {
      isBlank = false;
      this.push(eol);
    }
    appendNewLine = false;
    this.push(line + eol);
    next();
  }

  function flush(done) {
    if (appendNewLine) this.push(eol);
    done();
  }

  return pumpify(split(), through(transform, flush));
}
