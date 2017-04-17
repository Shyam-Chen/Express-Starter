import { expect } from 'chai';

// import server from '../src/server';

describe('test', () => {
  it('true is true', () => expect(true).to.equal(true));
});

// import { spy } from 'sinon';

// spy();
// spy(func);
// spy(object, 'method');

// ------------------------------

const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;

describe('capitalize', () => {
  it('capitalizes single words', () => {
    expect(capitalize('express')).to.equal('Express');
    expect(capitalize('mongoose')).to.equal('Mongoose');
  });

  it('leaves strings with no words alone', () => {
    expect(capitalize('')).to.equal('');
    expect(capitalize('123')).to.equal('123');
  });
});
