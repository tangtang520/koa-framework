/**
 * Created by tangtang on 2016/11/30.
 */
const models = require('../models');
const Quote = models.Quote;
const Dao = require('../dao');
const dao = new Dao(Quote);
const redisCli = require('../redis');
const consts = require('../common/consts');
const tools = require('../common/tools');
const enquiryService = require('./enquiry');

module.exports = dao;

dao.insertQuoteOrder = function* (data) {
  try{
    data.quoteOrderId = tools.uuid();
    data.personInfo = {}; //todo 登录信息拿
    const quoteOrderInfo = yield dao.create(data);
    //更新询价状态
    const entryUpdateInfo = yield enquiryService.update(
      {enquiryOrderId:data.enquiryOrderId},
      {$set:{status:consts.order_enquiry.status.已报价}});
    //todo 给店面发推送报价消息 发送完报价消息记录报价消息（app展示）
  }catch (err){
    throw err;
  }
}