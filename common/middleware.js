/**
 * Created by tangtang on 2016/11/23.
 */
const jwt = require('jsonwebtoken');
const redisCli = require('../redis');
exports.verify = function* (next) {
  try{
    const token = this.headers.authorization;
    if(typeof token === 'undefined'){
      //不存在
      this.body = {code:-2};
      return;
    };
    const decodes = jwt.verify(token,secret);
    // redis 判断
    const redis_value = yield redisCli.get(redisPrefix + decodes._doc.userName);
    if(!redis_value || (!!redis_value && redis_value !== token)){
      throw new Error();
    };
    yield next;
  }catch (err){
    T.error('err-->>',err);
    this.body = {code:-3};
  }
}