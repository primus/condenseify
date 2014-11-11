describe('condenseify', function () {
  'use strict';

  var concat = require('concat-stream')
    , through = require('through2')
    , condenseify = require('./')
    , assert = require('assert')
    , transform
    , source;

  beforeEach(function () {
    transform = condenseify();
    source = through();
  });

  it('is a Browserify transform', function () {
    assert.strictEqual(typeof condenseify, 'function');
  });

  it('does not transform the files with a .json extension', function (done) {
    var contents = '\n\n\n\n';

    transform = condenseify('foo.json');

    source.pipe(transform).pipe(concat(function (output) {
      assert.strictEqual(output.toString(), contents);
      done();
    }));

    source.write(contents);
    source.end();
  });

  it('works with both DOS and UNIX line endings', function (done) {
    var contents = [
      '\r',
      '',
      'var foo;',
      '',
      '\r',
      ''
    ].join('\n');

    source.pipe(transform).pipe(concat(function (output) {
      assert.strictEqual(output.toString(), '\nvar foo;\n');
      done();
    }));

    source.write(contents);
    source.end();
  });

  it('appends a new line if the file contains only blank lines', function (done) {
    var contents = '\n\n\n\n';

    source.pipe(transform).pipe(concat(function (output) {
      assert.strictEqual(output.toString(), '\n');
      done();
    }));

    source.write(contents);
    source.end();
  });

  it('removes the lines containing only white spaces', function (done) {
    var contents = [
      'var foo;',
      '\t ',
      '',
      '  ',
      '',
      'var bar;'
    ].join('\n');

    source.pipe(transform).pipe(concat(function (output) {
      assert.strictEqual(output.toString(), 'var foo;\n\nvar bar;\n');
      done();
    }));

    source.write(contents);
    source.end();
  });

  it('optionally keeps the lines containing only white spaces', function (done) {
    var contents = [
      'var foo;',
      '\t ',
      '',
      '  ',
      '',
      'function bar() {}',
      ''
    ].join('\n');

    transform = condenseify('foo.js', { 'keep-non-empty': true });

    source.pipe(transform).pipe(concat(function (output) {
      assert.strictEqual(output.toString(), contents);
      done();
    }));

    source.write(contents);
    source.end();
  });
});
