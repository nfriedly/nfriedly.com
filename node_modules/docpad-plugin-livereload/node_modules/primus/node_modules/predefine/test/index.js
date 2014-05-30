describe('predefine', function () {
  'use strict';

  var predefine = require('../')
    , chai = require('chai')
    , expect = chai.expect;

  chai.Assertion.includeStack = true;

  it('exports as function', function () {
    expect(predefine).to.be.a('function');
  });

  it('correctly assigns the value', function () {
    var obj = {};

    var writable = predefine(obj, predefine.WRITABLE)
      , readable = predefine(obj, predefine.READABLE);

    readable('foo', 'bar');
    expect(obj.foo).to.equal('bar');

    try { obj.foo = 'foo'; }
    catch (e) {}

    expect(obj.foo).to.equal('bar');

    writable('bar', 'bar');
    expect(obj.bar).to.equal('bar');

    obj.bar = 'foo';
    expect(obj.bar).to.equal('foo');
    expect(Object.keys(obj).length).to.equal(0);
  });

  it('does not throw when attempting to override', function () {
    var obj = {};

    var readable = predefine(obj, predefine.READABLE);

    readable('foo', 'bar');
    readable('foo', 'bar');
  });

  describe('.descriptor', function () {
    it('sees non Objects as an invalid description', function () {
      expect(predefine.descriptor([])).to.equal(false);
      expect(predefine.descriptor(undefined)).to.equal(false);
      expect(predefine.descriptor(null)).to.equal(false);
      expect(predefine.descriptor(0)).to.equal(false);
      expect(predefine.descriptor(1)).to.equal(false);
      expect(predefine.descriptor('')).to.equal(false);
      expect(predefine.descriptor(new Date)).to.equal(false);
    });

    it('disallows empty objects', function () {
      expect(predefine.descriptor({})).to.equal(false);
    });

    it('correctly detects valid descriptions', function () {
      expect(predefine.descriptor({
        enumerable: false
      })).to.equal(true);

      expect(predefine.descriptor({
        enumerable: true
      })).to.equal(true);

      expect(predefine.descriptor({
        enumerable: true,
        configurable: false
      })).to.equal(true);
    });

    it('doesnt accept non description keys in a object', function () {
      expect(predefine.descriptor({
        enumerable: true,
        configurable: false,
        fake: true
      })).to.equal(false);
    });
  });

  describe('patterns', function () {
    it('exposes the READABLE pattern', function () {
      expect(predefine.READABLE).to.be.a('object');
      expect(predefine.READABLE.enumerable).to.equal(false);
    });

    it('exposes the WRITABLE pattern', function () {
      expect(predefine.WRITABLE).to.be.a('object');
      expect(predefine.WRITABLE.configurable).to.equal(true);
      expect(predefine.WRITABLE.enumerable).to.equal(false);
      expect(predefine.WRITABLE.writable).to.equal(true);
    });
  });

  describe('.remove', function () {
    it('removes properties from an object', function () {
      var obj = { foo: 'bar' };

      predefine.remove(obj);
      expect(obj.foo).to.equal(undefined);
      expect('foo' in obj).to.equal(false);
    });

    it('doesnt remove defined properties', function () {
      var obj = { bar: 'bar' }
        , define = predefine(obj);

      define('foo', 'bar');
      expect(obj.foo).to.equal('bar');
      expect(obj.bar).to.equal('bar');

      predefine.remove(obj);
      expect(obj.foo).to.equal('bar');
      expect(obj.bar).to.equal(undefined);
    });
  });

  describe('.lazy', function () {
    it('adds a lazy loading property to the object', function () {
      var obj = {}
        , calls = 0;

      predefine.lazy(obj, 'foo', function () {
        calls++;
        return 'foo';
      });

      expect(calls).to.equal(0);
      expect(obj.foo).to.equal('foo');
      expect(calls).to.equal(1);
      expect(obj.foo).to.equal('foo');
      expect(calls).to.equal(1);
    });
  });
});
