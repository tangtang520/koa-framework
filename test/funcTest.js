/**
 * Created by tangtang on 2016/11/24.
 */
const expect = require('chai').expect;
require('mocha-generators').install();
const userService = require('../service/user');
require('../app');
describe('user module',function () {
  this.timeout(5000); //timeout
  this.slow(500); //solw level
  describe('user service',function () {
    it('1. login post',function* () {
      const result = yield userService.login('11','6512bd43d9caa6e02c990b0a82652dca');
      console.log('result-->>',result);
      expect(result).to.be.an('object');
      expect(result).to.have.property('res','SUCCESS');
      expect(result).to.have.property('data'); //可以嵌套
      expect(result).to.have.property('token');
      expect(result.token).to.be.a('string');
    });
    it('2. ---',function* () {

    })
  })
})