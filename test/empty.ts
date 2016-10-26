const chai = require('chai');
const expect = chai.expect;

declare const describe: any;
declare const it: any;

describe('test', () => {
  it('true is true', () => expect(true).to.equal(true));
});
