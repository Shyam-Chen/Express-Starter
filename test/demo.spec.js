// import request from 'supertest';
//
// import { server } from '../src/app';
//
// describe('loading express', function () {
//   afterEach(() => {
//     server.close();
//   });
//
//   it('responds to /__/list', done => {
//     request(server)
//       .get('/__/list')
//       .expect(200, done);
//   });
// });

// ------------------------------

import { sum } from './sum';

describe('sum', () => {
  test('adds 1 + 2 to equal 3', () => expect(sum(1, 2)).toBe(3));
});

// ------------------------------

const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;

describe('capitalize', () => {
  test('capitalizes single words', () => {
    expect(capitalize('express')).toEqual('Express');
    expect(capitalize('mongoose')).toEqual('Mongoose');
  });

  test('leaves strings with no words alone', () => {
    expect(capitalize('')).toEqual('');
    expect(capitalize('123')).toEqual('123');
  });
});

// ------------------------------

const hello = (name, cb) => {
  cb(`hello ${name}`);
};

describe('hello', () => {
  it('should call callback with correct greeting', () => {
    const cb = jest.fn();
    hello('foo', cb);
    expect(cb).toHaveBeenCalledWith('hello foo');
  });
});

// ------------------------------

const once = fn => {
  let returnValue;
  let called = false;

  return function () {
    if (!called) {
      called = true;
      returnValue = fn.apply(this, arguments);
    }

    return returnValue;
  };
};

describe('once', () => {
  let cb, proxy;

  beforeEach(() => {
    cb = jest.fn();
    proxy = once(cb);
  });

  it('calls the original function', () => {
    proxy();

    expect(cb).toHaveBeenCalled();
  });

  it('calls the original function only once', () => {
    proxy();
    proxy();

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('calls original function with right this and args', () => {
    const obj = {};
    proxy.call(obj, 1, 2, 3);

    expect(cb).toHaveBeenCalledWith(1, 2, 3);
  });
});
