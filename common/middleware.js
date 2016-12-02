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
    if(!token){
      return G.resErrorMsg('xxx','缺少 authorization')
    }
    const decodes = jwt.verify(token,G.jwtSecret);
    // redis 判断
    const redis_value = yield redisCli.get(G.tokenPrefix + decodes._doc.managerInfo.managerPhone);
    if(!redis_value || (!!redis_value && redis_value !== token)){
      throw new Error();
    }
    yield next;
    this.body = G.resSuccessMsg(0);
  }catch (err){
    this.body = G.resErrorMsg('xxx','token已失效,请重新登录')
  }
}


// key G.vCodePrefix+phone value {createTime:Date.now(),count:1,code:''}

//检验是否能生成验证码
exports.whetherCanSendCode = function* (next) {
  try{
    const phone = this.query.phone;
    if(!phone){
      return this.body = G.resErrorMsg('xxx','缺少phone');
    }
    if(!tools.matchPhone(phone)){
      return this.body = G.resErrorMsg('xxx','phone格式不正确');
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
          return this.body = G.resErrorMsg(-1,'两次时间间隔不能小于1分钟')
        }
        if(valueObj.count >= G.codeMaxCount){
          return this.body = G.resErrorMsg(-1,'超过最大生成次数')
        }
      }
    }
    yield next;
  }catch (err){

  }
};

//验证码是否正确
exports.whetherCodeTrue = function* (next) {
  try{
    const phone = this.request.body.phone;
    const code = this.request.body.code;
    if(!phone){
      return this.body = G.resErrorMsg('xxx','缺少phone');
    }
    if(!code){
      return this.body = G.resErrorMsg('xxx','缺少code');
    }
    const redisValue = yield redisCli.get(G.vCodePrefix + phone);
    if(!redisValue){
      return this.body = G.resErrorMsg('xxx','请先获取验证码');
    }
    const parseValue = JSON.parse(redisValue);
    if(parseValue.code !== code){
      return this.body = G.resErrorMsg('xxx','验证码不正确');
    }
    if(Date.now() - parseValue.createTime > G.invalidTime){
      return this.body = G.resErrorMsg('xxx','验证码已失效');
    }
    yield next;
  }catch (err){

  }
}