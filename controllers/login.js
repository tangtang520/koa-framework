/**
 * Created by tangtang on 2016/11/29.
 */

const sms = require('../common/sms');
const tools = require('../common/tools');
const branchService = require('../service/branch');
const middle = require('../common/middleware');
const redisCli = require('../redis');

exports.getCode = function* () {
  try{
    const phone = this.query.phone;
    if(!phone){
      return this.body = G.resErrorMsg('xxx','缺少phone');
    }
    if(!tools.matchPhone(phone)){
      return this.body = G.resErrorMsg('xxx','phone格式不正确');
    }
    //检验是否可以登录
    const branchInfo = yield branchService.findOne({'ownerInfo.phone':phone});
    if(!branchInfo){
      return this.body = G.resErrorMsg('xxx','跳转关于页面html-->>>');
    }
    //发送之前要进行检验
    const isCanSendCode = yield middle.whetherCanSendCode(phone);
    if(isCanSendCode.code !== 0){
      return this.body = isCanSendCode;
    }
    let code = tools.createVCode(6);
    const sendSMSResult = yield sms.sendMsg({
      mobile:phone,
      message:'您的验证码为' + code + '【公司名称】'
    });
    T.debug('sendSMSResult-->>',sendSMSResult);
    if(sendSMSResult.error === -20){
      //余额不足 发邮件
      tools.sendMail();
    }
    if(sendSMSResult.error === 0 && sendSMSResult.msg === 'ok'){
      const codeValue = yield redisCli.get(G.vCodePrefix + phone);
      redisCli.set(G.vCodePrefix + phone,JSON.stringify({
        createTime:Date.now(),
        count:codeValue ? JSON.parse(codeValue).count + 1 : 1,
        code:code
      }))
    }
  }catch (err){

  }
}