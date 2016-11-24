/**
 * Created by tangtang on 2016/11/24.
 */
const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app.listen());
describe('test API',function () {
  this.timeout(5000); //timeout
  this.slow(500); //solw level
  let token = '';
  describe('#user login post',function () {
    it('1. test login interface',function(done) {
      request.post('/user')
        .send({userName:'11',password:'6512bd43d9caa6e02c990b0a82652dca'})
        .expect(200)
        .end((err, res) => {
          if(err) throw err;
          let result = res.body;
          expect(result).to.be.an('object');
          expect(result).to.have.property('res','SUCCESS');
          expect(result).to.have.property('data'); //可以嵌套
          expect(result).to.have.property('token');
          expect(result.token).to.be.a('string');
          token = result.token;
          done();
        });
    });
    it('2. test',function (done) {
      request.get('/user')
        // .set('Authorization',token)
        .query({test:'11'})
        .end((err,res) => {
          if(err) throw err;
          done();
        })
    })
  })
})