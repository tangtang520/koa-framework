/**
 * Created by tangtang on 2016/11/23.
 */

const jwt = require('jsonwebtoken');
const redisCli = require('../redis');
const tools = require('../common/tools');
const moment = require('moment');

exports.verify = function* (next) {
  try{
    const token = this.headers.authorization;
    T.debug('token--->>',token);
    if(typeof token === 'undefined'){
      //不存在
      this.body = {code:-2};
      return;
    };
    const decodes = jwt.verify(token,G.secret);
    // redis 判断
    const redis_value = yield redisCli.get(G.redisPrefix + decodes._doc.userName);
    if(!redis_value || (!!redis_value && redis_value !== token)){
      throw new Error();
    };
    yield next;
  }catch (err){
    this.body = {code:-3};
  }
}


// key G.vCodePrefix+phone value {createTime:Date.now(),count:1,code:''}

//检验是否能生成验证码
exports.whetherCanSendCode = function* (phone) {
  try{
    if(!phone){
      return G.resErrorMsg('xxx','缺少phone');
    }
    if(!tools.matchPhone(phone)){
      return G.resErrorMsg('xxx','phone格式不正确');
    }
    let redis_key = G.vCodePrefix + phone;
    const getRedisValueByPhone = yield redisCli.get(redis_key);
    if(!!getRedisValueByPhone){
      const valueObj = JSON.parse(getRedisValueByPhone);
      //先判断是否过了一天
      let addTime = moment(valueObj.createTime).add(1,'d').format('D');
      let nowTime = moment(Date.now()).format('d');
      if(addTime === nowTime){
        //删除数据
        const delKey = yield redisCli.del(redis_key);
      }else{
        //两次的时间间隔
        if((Date.now() - getRedisValueByPhone.createTime) < G.codeCreateInterval){
          return G.resErrorMsg(-1,'两次时间间隔不能小于1分钟')
        }
        if(valueObj.count >= G.codeMaxCount){
          return G.resErrorMsg(-1,'超过最大生成次数')
        }
      }
    }
    return {code:0};
  }catch (err){

  }
}