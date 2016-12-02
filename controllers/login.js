/**
 * Created by tangtang on 2016/11/29.
 */

const sms = require('../common/sms');
const tools = require('../common/tools');
const branchService = require('../service/branch');
const middle = require('../common/middleware');
const redisCli = require('../redis');
const jwt = require('jsonwebtoken');

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
    if(isCanSendCode.code !== true){
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


//phone code
exports.login = function* () {
  try{
    const data = this.request.body;
    T.debug('data-->>',data);
    const branchInfo = yield branchService.findOne({
      'managePer.tel':data.phone
    })
    if(!branchInfo){
      return this.body = G.resErrorMsg('xxx','重新申请门店');
    }
    //生成jwt 发送token
    const obj = {
      branchInfo:{
        branchId:branchInfo.branchId || '',
        branchName:branchInfo.name || '',
      },
      managerInfo:{
        managerName:branchInfo.managePer && branchInfo.managePer.name || '',
        managerId:branchInfo.managePer && branchInfo.managePer.staffId || '',
        managerPhone:branchInfo.managePer && branchInfo.managePer.tel || '',
      }
    };

    const token = jwt.sign(obj,G.jwtSecret);
    T.debug('token-->>',token);
    //生成redis
    const createRedis = yield redisCli.set(G.tokenPrefix + data.phone,token);
    this.body = G.resSuccessMsg(branchInfo);
  }catch (err){

  }
}