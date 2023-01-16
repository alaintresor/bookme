import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const api = chai.request(server).keepOpen();
const { expect } = chai;
import server from '../src/app.js';

describe('Simple test', () => {
  it('Should add two numbers', (done) => {
    const number = 1 + 4;
    expect(number).to.equal(5);
    done();
  });
});
